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

Where $U_{i}$, $i = 1,2,3,...$, are i.i.d random variables (remember that $f(U_{i})$ and $\hat{\alpha}_{n}$ are also r.v) that are uniformly distributed. 

The key point here is that as $n \rightarrow \infty$, $\hat{\alpha}_{n} \rightarrow \alpha$ due to law of large numbers. 

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
    Monte Carlo estimate with 10 samples: 0.5417334205024875
    Error: 0.08203572637062728
    Monte Carlo estimate with 100 samples: 0.49365475531082686
    Error: 0.03395706117896663
    Monte Carlo estimate with 1000 samples: 0.45775737556502555
    Error: 0.0019403185668346867
    Monte Carlo estimate with 10000 samples: 0.4573001297449544
    Error: 0.0023975643869058594

<div class='remarks'>
Since MC method uses random sampling from uniform distributions, on some runs of the code above, n=10 may be more accurate than n=100 for the function x^2! This seems to happen less with the function sin(x).
</div>

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

which expresses the same variance as a mean squared deviation from $\alpha$.

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
plt.show()
print(f"Mean of errors: {np.mean(errorsList)}")
print(f"Standard deviation of errors: {np.std(errorsList)}")
print(f"Theoretical Standard Deviation: {math.sqrt(sigma_squared(f_x, n) / n)}")
```



    Mean of errors: 0.000241
    Standard deviation of errors: 0.007873
    Theoretical Standard Deviation: 0.007833

<figure>
<img src="/images/output_7_0.png"  style="width:15cm;height:12cm" />
<figcaption> </figcaption>
</figure>

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

    Sample Standard Deviation: 0.007871

##### Monte Carlo in High Dimensions and Financial Engineering

Monte Carlo methods converge at rate  
$$
\mathcal{O}\bigl(n^{-1/2}\bigr)
$$  
regardless of the dimension $d$. In contrast, a product trapezoidal rule in $d$ dimensions has error  
$$
\mathcal{O}\bigl(n^{-2/d}\bigr)
$$  
for twice continuously differentiable integrands, which deteriorates as $d$ increases. Thus Monte Carlo is often the method of choice for high-dimensional integrals. This should inspire some thoughts of using quantum computers, which excel in this realm.

##### Subtleties: Equating $\alpha$ and $E[f(U)]$

Here alpha is in fact the same as $E[f(U)]$. 

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

Where $U$ is the uniform distribution on interval $[0,1]$. 

This makes $\alpha$ the mean of $f(x)$.
##### Subtleties: Equivalence of Variance Formulations

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

