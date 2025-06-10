---
title: "Notes: Monte Carlo Methods in Financial Engineering"
date: "2025-06-06"
author: "Jayneel Parikh"
tags: ['notes','stochastic','finance']
category: "Technical"
description: "Notes from 'Monte Carlo Methods in Financial Engineering' by Paul Glasserman. These Notes are subject to be constantly updated as I read through more of the textbook."
layout: ../../layouts/ArticleLayout.astro
---

```python
import scipy.integrate as integrate
import random
import math
import matplotlib.pyplot as plt 
import numpy as np
```
## Chapter 1

>[!NOTE]
> The following chapter has been dutifully copied from the textbook, though into a style I prefer, sparsed in are some code blocks which you may collapse for readability purposes. Since this chapter is pivitol to understanding the rest of the work ahead - and has been written well by the author - I have been reluctant to make any large changes to the structure. 


### Chapter 1.1
#### 1.1.1 Introduction

Monte Carlo Approximation of Integral:

$$
\alpha = \int_{0}^{1} f(x)\,dx
$$

is 

$$
\hat{\alpha}_{n} = \frac{1}{n} \sum_{i=1}^{n} f(U_{i})
$$


Where $U_{i}$, $i = 1,2,3,...$, are i.i.d random variables (remember that $f(U_{i})$ and $\hat{\alpha}_{n}$ are also r.v) that are uniformly distributed. An important point is that alpha is the <b>mean</b> of the integral of $f(x)$ on interval $[0,1]$ and that $E[f(U)] = \alpha$.[^bignote]

The key point here is that as $n \rightarrow \inf$, $\hat{\alpha}_{n} \rightarrow \alpha$ due to law of large numbers. 



```python
def f_x(x):
    '''
    This function returns the value of the function f(x) = x^2.
    '''
    return math.sin(x)

def integrator (func):
    '''
    This function integrates the function func over the interval [0, 1].
    '''
    return integrate.quad(func, 0, 1)[0]

def monte_carlo_integrator(func, n):
    '''
    This function estimates the integral of func over the interval [0, 1]
    using the Monte Carlo method with n random samples.
    '''
    samples = []
    for _ in range(n):
        x = random.uniform(0,1)
        samples.append(func(x))

    return sum(samples) / n

exact_integral = integrator(f_x) #global variable to be used in variance calculation.
print("Exact integral of f(x) = sin(x) over [0, 1]:", exact_integral)

n_values = [10, 100, 1000, 10000]
for n in n_values:
    mc_integral = monte_carlo_integrator(f_x, n)
    print(f"Monte Carlo estimate with {n} samples: {mc_integral}")
    print(f"Error: {abs(mc_integral - exact_integral)}")


```

    Exact integral of f(x) = sin(x) over [0, 1]: 0.45969769413186023
    Monte Carlo estimate with 10 samples: 0.4537232939319543
    Error: 0.005974400199905916
    Monte Carlo estimate with 100 samples: 0.4307030920247507
    Error: 0.028994602107109524
    Monte Carlo estimate with 1000 samples: 0.4692670118673434
    Error: 0.00956931773548314
    Monte Carlo estimate with 10000 samples: 0.4550396312741984
    Error: 0.004658062857661849


<remark>
Notice:

Since MC method uses random sampling from unifrom distributions, on some runs of the code above, n=10 may be more accurate than n=100 for the function x^2! This seems to happen less with the function sin(x). 
</remark>



##### Variance and Asymptotic Normality

We define the variance of the function $f$ over the interval $[0,1]$ as:

$$
\sigma^2_f = \int_0^1 (f(x) - \alpha)^2 \, dx
$$
Since $\alpha = \mathbb{E}[f(U)]$, we are interested in the variance of the random variable $f(U)$, where $U \sim \text{Uniform}(0,1)$.

By the standard formula for variance:

$$
\text{Var}(f(U)) = \mathbb{E}[f(U)^2] - (\mathbb{E}[f(U)])^2
$$

This is equivalent to:

$$
\sigma^2_f = \int_0^1 (f(x) - \alpha)^2\, dx
$$ 


which expresses the same variance as a mean squared deviation from $\alpha$. [^bignote2]












```python
def sigma_squared(func, n):
    '''
    This function estimates the variance of the function func over the interval [0, 1].    
    '''
    alpha = exact_integral
    return integrate.quad(lambda x: (func(x) - alpha)**2, 0, 1)[0]

print("Variance of f(x) = sin(x) over [0, 1]:", sigma_squared(f_x, 10000))
```

    Variance of f(x) = sin(x) over [0, 1]: 0.0613536733034302


Now consider the Monte Carlo estimate:

$$
\hat{\alpha}_n = \frac{1}{n} \sum_{i=1}^{n} f(U_i)
$$

Because the $U_i$ are i.i.d., the values $f(U_i)$ are also i.i.d. with mean $\alpha$ and variance $\sigma^2_f$.  
Therefore, the variance of the sample mean is:

$$
\text{Var}(\hat{\alpha}_n) = \frac{\sigma^2_f}{n}
$$

By the **central limit theorem**, as $n \to \infty$, the sampling distribution of $\hat{\alpha}_n$ becomes approximately normal:

$$
\hat{\alpha}_n \approx \mathcal{N}\left( \alpha, \frac{\sigma^2_f}{n} \right)
$$

This implies that the error term

$$
\hat{\alpha}_n - \alpha
$$

is approximately normally distributed with:

- Mean: $0$
- Standard deviation: $\sigma_f / \sqrt{n}$




```python
def error_term(func,mc_estimator,exact_integral,n):
    return  mc_estimator(func,n) - exact_integral

n = 1000
errorsList =[error_term(f_x,monte_carlo_integrator,  exact_integral, n) for _ in range(1000)]
plt.xlabel('Error: alpha_hat - alpha')
plt.ylabel('Frequency of Error')
plt.title('Histogram of Errors in Monte Carlo Integration Demonstrating Central Limit Theorem')
plt.hist(errorsList, bins=30, density=True, alpha=0.6, color='r')
plt.savefig('histogram_MC_Integration_CLT.png', transparent=True)
plt.show()

print(f"Mean of errors: {np.mean(errorsList):.6f}")
print(f"Standard deviation of errors: {np.std(errorsList):.6f}")
print(f"Theoretical Standard Deviation: {math.sqrt(sigma_squared(f_x, n) / n):.6f}")


```
 ![png](output_7_0.png)


    


    Mean of errors: -0.000182
    Standard deviation of errors: 0.007798
    Theoretical Standard Deviation: 0.007833


In practice, $\sigma^2_f$ is usually unknown because it depends on the unknown integral $\alpha$.  
We approximate it using the **sample variance** of the observed values $f(U_1), \dots, f(U_n)$:

$$
s^2_f = \frac{1}{n - 1} \sum_{i=1}^{n} \left( f(U_i) - \hat{\alpha}_n \right)^2
$$

and the **sample standard deviation** is:

$$
s_f = \sqrt{s^2_f}
$$

This gives us a way to estimate the uncertainty in the Monte Carlo approximation.



```python
def sample_standard_deviation(func, n, monte_carlo_integrator):
    '''
    Calculate sample standard deviation using the formula from page 2.
    '''
    # Generate n samples
    samples = [random.uniform(0, 1) for _ in range(n)]
    
    # Calculate f(U_i) values
    f_values = [func(u) for u in samples]
    
    alpha_hat = monte_carlo_integrator(func, n)
    
    squared_deviations = [(f_val - alpha_hat)**2 for f_val in f_values]
    s_f = math.sqrt(sum(squared_deviations) / (n - 1))
    
    return s_f

n=1000
print(f"Sample Standard Deviation: {sample_standard_deviation(f_x, n, monte_carlo_integrator)/ math.sqrt(n):.6f}")    
```

    Sample Standard Deviation: 0.007941


##### Why Monte Carlo?
For 1-dimensional twice-differentiable functions, the trapezoidal rule's error rate is $O(n^{-2})$ while the MC method's error rate is $O(n^{-1/2})$. Hence, for low-dimensional integrals the MC method is <b> not </b> competitive. 

MC method truely shines on larger dimensional integrals as the error rate stays $O(n^{-1/2})$ while the trapezoidal rule has error rate $O(n^{-2/d})$ (it decays with higher dimensions). 

Modeling the value of a derivative secruity using MC requires simulating multiple stochastic paths (say, with Geometric Brownian Motion) that model the evolution of the <i>underlying</i> security, <i>interest rates</i>, <i>model parameters</i>, and <i>other relevant factors</i>. Instead of sampling from $[0,1]^d$, we sample from a space of <i> paths </i> (which are all possible trajectories of the price of the underlying security). As stated in the textbook: "The dimension will ordinarily be at least as large as the number of time steps in the simulation, and this could easily be large enough to make the square-root convergence rate for Monte Carlo competitive with alternative methods." 





[^bignote]: 
    
    Here alpha is infact the same as $E[f(U)]$. 

    $$
    f_U(x) = 
    \begin{cases}
    1 & \text{if } x \in [0,1] \\
    0 & \text{otherwise}
    \end{cases}
    $$

    Then

    $$
    \mathbb{E}[f(U)] = \int_0^1 f(x) \cdot f_U(x)\, dx = \int_0^1 f(x) \cdot 1\, dx = \int_0^1 f(x)\, dx = \alpha
    $$

    Where U is the uniform distribution on interval $[0,1]$. 

    This makes $\alpha$ the mean of f(x).

[^bignote2]: 
    We know
    $$
    \mathrm{Var}(f(U)) 
    = \mathbb{E}[f(U)^2] - \bigl(\mathbb{E}[f(U)]\bigr)^2
    = \int_0^1 f(x)^2\,dx \;-\;\alpha^2.
    $$

    Next, add and subtract the cross‐term $2\alpha\int_0^1 f(x)\,dx$ and add $\int_0^1\alpha^2\,dx$:

    $$
    \begin{aligned}
    \int_0^1 f(x)^2\,dx - \alpha^2
    &= \int_0^1 f(x)^2\,dx
    \;-\;2\alpha\int_0^1 f(x)\,dx
    \;+\;\int_0^1 \alpha^2\,dx \\
    &= \int_0^1 \bigl[f(x)^2 - 2\alpha f(x) + \alpha^2\bigr] \, dx \\
    &= \int_0^1 (f(x)-\alpha)^2 \, dx.
    \end{aligned}
    $$

    Thus,
    $$
    \sigma_f^2
    = \mathrm{Var}(f(U))
    = \int_0^1 (f(x)-\alpha)^2 \, dx,
    $$
    confirming the equivalence.


#### 1.1.2 First Examples

- $S(t)$: Price of the stock at time $t$.
- $K$: Strike price; the fixed price at which the holder can buy the stock.
- $T$: Expiry time; the fixed future time at which the option can be exercised.
- $t$: Current time

**Call option** — A financial contract granting the right (not obligation) to buy a stock at price $K$ at time $T$.[^3]

[^3]: Specifically, these are European options. American options can be exercised at any time $t < T$. 


The payoff to the holder at time $t=T$ is:

$$
(S(T) - K)^+ = max\{S(T)-K,0\}
$$

If $S(T) > K$, the option is exercised, and the holder profits: $S(T) - K$.
If $S(T) \leq K$, the option expires worthless (no profit or loss).

We multiply by a discount factor $e^{-rt}$, where r is a continuously compound interest rate. The <b>expected present value </b> is defined as $\mathbb{E}[e^{-rt}(S(T) - K)^+]$.

* Note: This discount factor should feel familiar to any physicist. This is the same decay factor used in damped springs and radioactive decay. Its form comes from solving differential equations of the form $\frac{dy}{dt} = ky$. Discount factor is applied due to money being compounded with a factor of $e^{rt}$. i.e If you have $V$ dollars today, you could invest it risk-free and have $Ve^{rT}$ dollars at time $T$.

To describe the evolution of the stock prices we employ the Black-Scholes equation, a stochastic differential equation.

$$
\frac{dS(t)}{S(t)} = rdt + \sigma dW(t)
$$

- $\sigma$ is the volatility of the price of the underlying security.
- $r$ is the mean rate of return $\equiv$ interest rate (through some measure theory (change in metric) I don't quite understand). This equivalance implies risk-neutral dynamics. 
- $W$ is standard Brownian motion.

 We can interpret this by saying we find the percentage changes ($dS/S$) as increments of Brownian motion. 

The solution the SDE is:

$$
S(T) = S(0)e^{[r-1/2\sigma^2]T+\sigma W(T)} 
= S(0)e^{[r-1/2\sigma^2]T+\sigma \sqrt{T}Z}
$$

at terminal time $T$. W is normally distributed with mean $0$ and variance $T$ - which is the same as the distribution of $\sqrt{T}Z$ where $Z \sim N(0,1)$.




```python

S0 = 100    # S(0)
r = 0.05    # risk-free rate  
sigma = 0.2 # volatility
T = 1.0     # time to expiration
n_scenarios = 10000

def S_T (S0,r,sigma,T,n_scenarios):
    # Generate n scenerios
    # W(T) = sqrt(T) * Z, Z ~ N(0,1)
    Z = np.random.normal(0, 1, n_scenarios)
    W_T = np.sqrt(T) * Z

    #Exact Soultion
    S_T = S0 * np.exp((r - 0.5*sigma**2)*T + sigma*W_T)
    
    return S_T

#Visualization
plt.hist(S_T (S0,r,sigma,T,n_scenarios), bins=50, density=True, alpha=0.7, color='skyblue')
plt.xlabel('Stock Price at T=1')
plt.ylabel('Probability Density')
plt.title('Lognormal Distribution of Stock Prices at T=1')
plt.savefig('lognormal_distribution.png', transparent=True)
plt.show()

print(f"Theoretical mean: {S0 * np.exp(r*T):.2f}")
print(f"Simulated mean: {np.mean(S_T):.2f}")


```
![png](output_13_0.png)


    
    


    Theoretical mean: 105.13
    Simulated mean: 105.13




