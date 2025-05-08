---
title: "Simulation Of Jupiter and its Galilean Moons"
date: "2025-05-07"
author: "Jayneel Parikh"
tags: ['python','physics']
category: "Technical"
featured_image: "/images/urban-garden.jpg"
description: "Simulation of Jupiter and its Galilean Moons using 4th order Runge-Kutta techniques. Expanded to N-body problem and simulation of chaotic motion. This article was inspired by my friend Cam."
layout: ../../layouts/ArticleLayoutTest.astro
---

# Introduction
The goal of this article is to explore how we can model N-body systems using numerical techniques. First we will begin by exploring the Jupiter-Galilean Moon system, where the mass of a 'central' body is much larger than mass of 'orbiting bodies' (i.e Sun - Planet, Earth - , Jupiter - Moons). We will then explore a three body system where masses are similar in magnitude. 

<div class = 'remarks'>
Our focus is on numerical simulation techniques and not animation. For this reason, I will not include my animation code, but if you're curious on how I animated it please feel free to contact me.
</div>

## 1. Simplifying Assumptions For Jupiter - Moons System and Importing Libraries 
We will begin with some simplifying assumptions:
 - The system is restricted to Jupiter and its Galilean moons. Small moons within the orbit of IO are not considered. The sun is not considered.
 - Jupiter is initially a stationary object.
 - Neglecting perturbations (Only accounting point-mass Newtonian gravity). 
 - Planer motion.
 - No atmospheric drag.
 - Each moon starts exactly at its periapsis.


```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation #can ignore
from matplotlib.patches import Circle #can ignore
import matplotlib.colors as mcolors #can ignore
```

## 2. Defining Constants

All constants are in SI units.

```python
# Constants (SI units)
G = 6.67430e-11  # Gravitational constant

# Galilean moons: mass, semi-major axis, eccentricity, orbital period, and visualization color

MOONS = {
    'Io':   {'mass': 8.9319e22, 
            'semi_major_axis': 421800e3, 
            'eccentricity': 0.0041, 
            'period': 1.769*24*3600, 
            'color': 'yellow'}, #color in simulation gif
    'Europa':   {'mass': 4.7998e22, 
                'semi_major_axis': 671100e3, 
                'eccentricity': 0.0094, 
                'period': 3.551*24*3600, 
                'color': 'red'},
    'Ganymede': {'mass': 1.4819e23, 
                'semi_major_axis': 1070400e3, 
                'eccentricity': 0.0013, 
                'period': 7.155*24*3600, 
                'color': 'green'},
    'Callisto': {'mass': 1.0759e23, 
                'semi_major_axis': 1882700e3, 
                'eccentricity': 0.0074, 
                'period': 16.69*24*3600, 
                'color': 'blue'}
}

JUPITER_RADIUS = 71492e3 
JUPITER_COLOR = 'orange'
M_JUPITER = 1.898e27  # Mass of Jupiter (kg)
```

## 3. Initial Conditions
Now we set up initial positions at periapsis using the semi-major axis and eccentricity. Velocities come from the vis-viva equation: $v = \sqrt{GM\left(\frac{2}{r} - \frac{1}{a}\right)}$.


```python
def initialize_system():
    positions = [np.array([0.0, 0.0])]  # Jupiter at origin
    velocities = [np.array([0.0, 0.0])]  # Jupiter initially stationary

    for moon in MOONS.values():
        a = moon['semi_major_axis']
        e = moon['eccentricity']
        r = a * (1 - e)  # periapsis distance
        pos = np.array([r, 0.0])
        v_mag = np.sqrt(G * M_JUPITER * (2/r - 1/a))
        vel = np.array([0.0, v_mag])
        positions.append(pos)
        velocities.append(vel)

    return np.array(positions), np.array(velocities)
```

## 4. Gravitational Acceleration
We compute pairwise gravitational acceleration for each body: 
$$
\mathbf{a}_i = G\sum_{j\neq i} m_j \frac{\mathbf{r}_j - \mathbf{r}_i}{|\mathbf{r}_j - \mathbf{r}_i|^3}
$$

```python
def gravitational_acceleration(positions, masses):
    n = len(positions)
    accelerations = np.zeros_like(positions)
    for i in range(n):
        for j in range(n):
            if i != j:
                r_vec = positions[j] - positions[i]
                dist_sq = np.dot(r_vec, r_vec)
                accelerations[i] += G * masses[j] * r_vec / (dist_sq * np.sqrt(dist_sq))
    return accelerations
```

## 5. Numerical Integration with Runge–Kutta 4
The RK4 method provides a good balance between accuracy and computational cost. We update positions and velocities every timestep $\Delta t$. The  the local truncation error is on the order of  $O(h^{5})$ while the total accumulated error is on the order of $O(h^{4})$. RK$ is not symplectic, hence over a large time scale there will be an accumulation of errors. Here we have a short enought time scale where this wont cause any large issues.

<div class ='remarks' >
It is always a careful choice on which iterative numerical method to use to use (Runge-Kutta, Euler,...). The answer comes down to the balance between desired accuracy and computational speed. Here where we have many interacting bodies causing small perturbations, 4th order Runge-Kutta (or simple Runge-Kutta) strikes a fair balance. When we model chaotic systems we may instead want higher order RK techniques.
</div>

```python
def rk4_step(positions, velocities, masses, dt):
    a1 = gravitational_acceleration(positions, masses)
    k1_v = a1 * dt; k1_r = velocities * dt

    a2 = gravitational_acceleration(positions + 0.5*k1_r, masses)
    k2_v = a2 * dt; k2_r = (velocities + 0.5*k1_v) * dt

    a3 = gravitational_acceleration(positions + 0.5*k2_r, masses)
    k3_v = a3 * dt; k3_r = (velocities + 0.5*k2_v) * dt

    a4 = gravitational_acceleration(positions + k3_r, masses)
    k4_v = a4 * dt; k4_r = (velocities + k3_v) * dt

    positions_new = positions + (k1_r + 2*k2_r + 2*k3_r + k4_r)/6
    velocities_new = velocities + (k1_v + 2*k2_v + 2*k3_v + k4_v)/6
    return positions_new, velocities_new
```

## 6. Running the Simulation
We integrate for one Jovian month (~30.44 days) mapped to a 60-second animation. This cell runs the core loop and stores trajectories.

```python
def run_simulation(duration, dt):
    positions, velocities = initialize_system()
    masses = np.array([M_JUPITER] + [m['mass'] for m in MOONS.values()])
    steps = int(duration / dt)
    traj = np.zeros((steps, len(masses), 2))
    traj[0] = positions

    for i in range(1, steps):
        positions, velocities = rk4_step(positions, velocities, masses, dt)
        traj[i] = positions
        if i % (steps // 10) == 0:
            print(f"Progress: {i/steps:.1%}")
    return traj

# Example usage
sim_duration = 30.44 * 24*3600  # seconds
real_time = 60  # seconds of animation
fps = 30
dt = sim_duration / (real_time * fps)
trajectory = run_simulation(sim_duration, dt)
```
<figure>
<img src="/images/jupiter_moons.gif"  style="width:9cm;height:9cm" />
<figcaption> 
Simulation of Jupiter and its Galilean Moons
</figcaption>
</figure>
