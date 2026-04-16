---
title: "From Diffusion to Fractional Diffusion: A CTRW Approach to Anomalous Transport"
description: "The standard diffusion equation assumes a finite mean waiting time and a finite jump variance. When either assumption fails, as it does for tracer particles in turbulent plasmas with long trapping events and large radial jumps, the central limit theorem no longer applies and the diffusion equation is replaced by a fractional diffusion equation derived from a heavy-tailed continuous-time random walk."
date: "2026-04-16"
tags: ["math", "physics", "stochastic"]
layout: ../../layouts/ArticleLayout.astro
---

<div class="remarks">Original PDF: <a href="/papers/fractional-diffusion-ctrw.pdf">download</a>.</div>

## Introduction
Since the earliest tokamak experiments, measured cross-field transport has exceeded both classical and neoclassical predictions, often by one to two orders of magnitude [3, 4]. The standard picture attributes this to turbulence. There is also a mathematical issue. The local diffusive model for a scalar field $\phi$,

$$
\partial_t \phi = \partial_x \bigl[\chi\, \partial_x \phi\bigr] + S,
$$

follows from a conservation law and Fick's law. Its derivation from a Brownian random walk requires Gaussian statistics, Markovian dynamics, and a well-defined transport scale [1]. Turbulent trapping and large radial flights violate all three.

We ask what equation replaces ordinary diffusion when the underlying stochastic process has heavy-tailed statistics. One such equation, developed by Montroll and Weiss [5], Metzler and Klafter [1], and others, is a fractional diffusion equation

$$
{}^{C}_{0}D_t^{\beta} P = \chi\, D_{|x|}^{\alpha} P,
$$

where ${}^{C}_{0}D_t^{\beta}$ is the Caputo fractional time derivative of order $0 < \beta \leq 1$, and $D_{|x|}^{\alpha}$ is the Riesz fractional space derivative of order $0 < \alpha \leq 2$. For $\alpha=2$ and $\beta=1$ the equation reduces to the ordinary diffusion equation. The fractional orders are set by the tail exponents of the jump and waiting-time distributions in the underlying CTRW.

<figure id="fig:regime_map">
<img src="/images/articles/fractional-diffusion-ctrw/fig7_regime_map.png" style="width:88.0%" />
<figcaption>Parameter space of the fractional diffusion equation <a href="#eq:fde" data-reference-type="eqref" data-reference="eq:fde">[eq:fde]</a> in the <span class="math inline">(<em>α</em>, <em>β</em>)</span> plane. The spatial order <span class="math inline"><em>α</em></span> controls the tail decay of the propagator (<span class="math inline"><em>P</em> ∼ |<em>x</em>|<sup>−(1 + <em>α</em>)</sup></span>), while the temporal order <span class="math inline"><em>β</em></span> controls memory. Ordinary Gaussian diffusion sits at <span class="math inline">(<em>α</em>, <em>β</em>) = (2, 1)</span>. The right edge <span class="math inline"><em>α</em> = 2</span> with <span class="math inline"><em>β</em> &lt; 1</span> gives subdiffusion with <span class="math inline">⟨<em>x</em><sup>2</sup>⟩ ∼ <em>t</em><sup><em>β</em></sup></span>; the top edge <span class="math inline"><em>β</em> = 1</span> with <span class="math inline"><em>α</em> &lt; 2</span> gives Markovian Lévy flights. Dashed contours show the similarity exponent <span class="math inline"><em>ν</em> = <em>β</em>/<em>α</em></span>, which determines the self-similar scaling of the Green’s function. The plasma-turbulence parameters of del-Castillo-Negrete <em>et al.</em> <span class="citation" data-cites="del-castillo-negreteFractionalDiffusionPlasma2004">[2]</span>, <span class="math inline">(<em>α</em>, <em>β</em>) = (3/4, 1/2)</span> with <span class="math inline"><em>ν</em> = 2/3</span>, are marked alongside the simulation parameters used in Figures <a href="#fig:ctrw_ensemble" data-reference-type="ref" data-reference="fig:ctrw_ensemble">3</a> and <a href="#fig:transport_regimes" data-reference-type="ref" data-reference="fig:transport_regimes">5</a>. Near the lower-left corner, convergence of the fractional approximation to the exact CTRW becomes slow, especially at <span class="math inline"><em>x</em> = 0</span> <span class="citation" data-cites="barkaiCTRWPathwaysFractional2002">[6]</span>.</figcaption>
</figure>

An application to plasma turbulence was given by del-Castillo-Negrete, Carreras, and Lynch [2, 7]. They simulated tracer particles in pressure-gradient-driven plasma turbulence and found that the radial displacement pdf had algebraic tails decaying as $|x|^{-(1+\alpha)}$ with $\alpha \approx 3/4$, and that the similarity exponent was $\nu = 2/3$. Equation <a href="#eq:fde" data-reference-type="eqref" data-reference="eq:fde">[eq:fde]</a> with $\alpha = 3/4$ and $\beta = 1/2$ reproduced these results quantitatively.

The thesis is organized as follows. Section <a href="#sec:ctrw" data-reference-type="ref" data-reference="sec:ctrw">2</a> derives the fractional diffusion equation from the CTRW, treating the Brownian and heavy-tailed cases side by side. Section <a href="#sec:operators" data-reference-type="ref" data-reference="sec:operators">3</a> defines the fractional operators and shows how they invert the Fourier-Laplace transform of the CTRW solution. Section <a href="#sec:discussion" data-reference-type="ref" data-reference="sec:discussion">4</a> discusses the physical content of the model and its limitations.

## From Random Walks to Fractional Diffusion
### The Montroll--Weiss Equation

Consider a particle that waits a random time $\tau_i$ drawn from a pdf $\psi(\tau)$, then jumps by a random displacement $\zeta_i$ drawn from a pdf $\lambda(\zeta)$. We assume waiting times and jump lengths are independent. The probability $P(x,t)$ of finding the particle at position $x$ at time $t$ satisfies the Montroll--Weiss equation [1]:

$$
P(x,t) = \delta(x)\int_t^{\infty} \psi(t')\,dt' + \int_0^t \psi(t-t') \left[\int_{-\infty}^{\infty} \lambda(x-x')\,P(x',t')\,dx'\right] dt'.
$$

The first term accounts for particles that have not yet jumped. The second accounts for particles that arrived at $x'$ at time $t'$ and then jumped to $x$. Introducing the Fourier transform $\hat{f}(k) = \int e^{ikx} f(x)\,dx$ and the Laplace transform $\tilde{f}(s) = \int_0^{\infty} e^{-st} f(t)\,dt$, equation <a href="#eq:MW_real" data-reference-type="eqref" data-reference="eq:MW_real">[eq:MW_real]</a> becomes algebraic [1]:

$$
\hat{\tilde{P}}(k,s) = \frac{1 - \tilde{\psi}(s)}{s} \cdot \frac{1}{1 - \tilde{\psi}(s)\,\hat{\lambda}(k)}.
$$

Apply the Laplace transform to <a href="#eq:MW_real" data-reference-type="eqref" data-reference="eq:MW_real">[eq:MW_real]</a>. The survival probability $\int_t^{\infty}\psi(t')\,dt'$ in the first term has Laplace transform

$$
\mathcal{L}\!\left[\int_t^{\infty}\psi(t')\,dt'\right]
  = \int_0^{\infty}e^{-st}\int_t^{\infty}\psi(t')\,dt'\,dt
  = \int_0^{\infty}\psi(t')\int_0^{t'}e^{-st}\,dt\,dt'
  = \frac{1-\tilde{\psi}(s)}{s},
$$

where Fubini's theorem was used to exchange the order of integration. The second term in <a href="#eq:MW_real" data-reference-type="eqref" data-reference="eq:MW_real">[eq:MW_real]</a> is a time convolution of $\psi$ with the spatial convolution $\int\lambda(x-x')P(x',t')\,dx'$. By the Laplace convolution theorem it transforms to $\tilde{\psi}(s)$ times the Laplace transform of the spatial term; the Fourier convolution theorem then converts the spatial integral to $\hat{\lambda}(k)\,\hat{\tilde{P}}(k,s)$. Taking the Fourier transform of the first term gives $\hat{\delta}(k)\cdot(1-\tilde{\psi}(s))/s = (1-\tilde{\psi}(s))/s$. Assembling both sides:

$$
\hat{\tilde{P}} = \frac{1-\tilde{\psi}(s)}{s} + \tilde{\psi}(s)\,\hat{\lambda}(k)\,\hat{\tilde{P}}.
$$

Solving for $\hat{\tilde{P}}$ gives <a href="#eq:MW" data-reference-type="eqref" data-reference="eq:MW">[eq:MW]</a> directly.

### Recovering Ordinary Diffusion

Take an exponential waiting-time pdf $\psi_M(\tau) = \mu\, e^{-\mu\tau}$ with finite mean $\langle \tau \rangle = 1/\mu$, and a Gaussian jump pdf $\lambda_F(\zeta) = (2\pi\sigma)^{-1/2}\exp(-\zeta^2/2\sigma)$ with finite variance $\langle \zeta^2 \rangle = \sigma$. To take the continuum limit, we rescale waiting times by a factor $r$ and jumps by a factor $h$, then send $r, h \to 0$. The small-parameter expansions of the transforms are

$$
\begin{aligned}
    \tilde{\psi}_M(rs) &= \frac{1}{1 + rs\langle\tau\rangle} \approx 1 - rs\langle\tau\rangle + \cdots,\\[4pt]
    \hat{\lambda}_F(hk) &= e^{-\langle\zeta^2\rangle h^2 k^2/2} \approx 1 - \langle\zeta^2\rangle h^2\,\frac{k^2}{2} + \cdots.
\end{aligned}
$$

Substituting <a href="#eq:psi_gauss" data-reference-type="eqref" data-reference="eq:psi_gauss">[eq:psi_gauss]</a>--<a href="#eq:lam_gauss" data-reference-type="eqref" data-reference="eq:lam_gauss">[eq:lam_gauss]</a> into <a href="#eq:MW" data-reference-type="eqref" data-reference="eq:MW">[eq:MW]</a> and expanding to leading order in $r$ and $h$, the numerator becomes $1-\tilde{\psi}(rs)\approx rs\langle\tau\rangle$, while the denominator factor satisfies

$$
1 - \tilde{\psi}(rs)\,\hat{\lambda}(hk)
  \approx 1 - \bigl(1 - rs\langle\tau\rangle\bigr)\!\bigl(1 - \tfrac{1}{2}\langle\zeta^2\rangle h^2 k^2\bigr)
  \approx rs\langle\tau\rangle + \tfrac{1}{2}\langle\zeta^2\rangle h^2 k^2,
$$

where the cross-term $rs\langle\tau\rangle\cdot\frac{1}{2}\langle\zeta^2\rangle h^2k^2$ is of higher order in $r$ and $h$ and is dropped. To see this consistently: the diffusivity $\chi = h^2\langle\zeta^2\rangle/(2r\langle\tau\rangle)$ is held finite as $r,h\to 0$, which requires $h^2 \sim r$. Under this coupling the cross-term scales as $r\cdot h^2 \sim r^2$, while the two retained terms each scale as $r$, so the cross-term is sub-leading and the truncation is self-consistent. Therefore

$$
\hat{\tilde{P}} \approx \frac{rs\langle\tau\rangle}{s\bigl(rs\langle\tau\rangle + \frac{1}{2}\langle\zeta^2\rangle h^2 k^2\bigr)}
  = \frac{1}{s + \dfrac{\langle\zeta^2\rangle h^2}{2r\langle\tau\rangle}k^2}
  = \frac{1}{s + \chi k^2},
$$

where $\chi = h^2\langle\zeta^2\rangle/(2r\langle\tau\rangle)$ is held finite as $r,h\to 0$. Rearranging gives

$$
s\,\hat{\tilde{P}} - 1 = -\chi\, k^2\, \hat{\tilde{P}}.
$$

Using $P(x,0)=\delta(x)$, the standard transform identities

$$
\begin{aligned}
    \mathcal{L}[\partial_t P] &= s\tilde{P}(s) - \delta(x), \\
    \mathcal{F}[\partial_x^2 P] &= -k^2 \hat{P}(k),
\end{aligned}
$$

invert <a href="#eq:diff_FL" data-reference-type="eqref" data-reference="eq:diff_FL">[eq:diff_FL]</a> to give $\partial_t P = \chi\,\partial_x^2 P$. This holds whenever both $\langle \tau \rangle$ and $\langle \zeta^2 \rangle$ are finite [1].

### Heavy Tails and the Breakdown of the CLT

Now suppose the dynamics produces power-law tails [2]:

$$
\psi(\tau) \sim \tau^{-(1+\beta)}, \quad 0 < \beta < 1, \qquad
    \lambda(\zeta) \sim |\zeta|^{-(1+\alpha)}, \quad 0 < \alpha < 2.
$$

The mean waiting time $\langle \tau \rangle = \int \tau\,\psi(\tau)\,d\tau$ diverges because $\beta < 1$. The jump variance $\langle \zeta^2 \rangle = \int \zeta^2\,\lambda(\zeta)\,d\zeta$ diverges because $\alpha < 2$. More generally, the moment $\langle |\zeta|^n \rangle$ diverges for any $n \geq \alpha$ [1]. Neither $\langle \tau \rangle$ nor $\langle \zeta^2 \rangle$ exists, so the standard CLT does not apply and the continuum limit cannot produce the ordinary diffusion equation.

What happens instead is governed by a Tauberian theorem: a pdf with algebraic tail $\psi(\tau) \sim \tau^{-(1+\beta)}$ has a Laplace transform that behaves, for small $s$, as $\tilde{\psi}(s) \approx 1 - c_1 s^{\beta}$. The singularity structure of the transform at small argument encodes the slow decay of the pdf at large argument. Similarly, $\hat{\lambda}(k) \approx 1 - c_2 |k|^{\alpha}$ for small $k$ [1]. Rescaling as before and substituting into <a href="#eq:MW" data-reference-type="eqref" data-reference="eq:MW">[eq:MW]</a>:

$$
\begin{aligned}
    \tilde{\psi}(rs) &\approx 1 - c_1(rs)^{\beta} + \cdots,\\[4pt]
    \hat{\lambda}(hk) &\approx 1 - c_2(h|k|)^{\alpha} + \cdots.
\end{aligned}
$$

Substituting <a href="#eq:psi_heavy" data-reference-type="eqref" data-reference="eq:psi_heavy">[eq:psi_heavy]</a>--<a href="#eq:lam_heavy" data-reference-type="eqref" data-reference="eq:lam_heavy">[eq:lam_heavy]</a> into <a href="#eq:MW" data-reference-type="eqref" data-reference="eq:MW">[eq:MW]</a>, the numerator is $1-\tilde{\psi}(rs)\approx c_1 r^{\beta}s^{\beta}$, and the denominator factor becomes

$$
1 - \tilde{\psi}(rs)\,\hat{\lambda}(hk)
  \approx c_1 r^{\beta}s^{\beta} + c_2 h^{\alpha}|k|^{\alpha},
$$

again dropping the higher-order cross-term. Assembling:

$$
\hat{\tilde{P}}
  \approx \frac{c_1 r^{\beta} s^{\beta}}{s\bigl(c_1 r^{\beta} s^{\beta} + c_2 h^{\alpha}|k|^{\alpha}\bigr)}
  = \frac{s^{\beta-1}}{s^{\beta} + \chi|k|^{\alpha}},
$$

where $\chi = c_2 h^{\alpha}/(c_1 r^{\beta})$ is held finite. To obtain a nontrivial continuum limit, the two denominator terms must remain of the same order as $r,h\to 0$. This scaling keeps the spatial and temporal terms at the same order in the continuum limit. Rearranging gives

$$
\boxed{s^{\beta}\,\hat{\tilde{P}} - s^{\beta - 1} = -\chi\,|k|^{\alpha}\,\hat{\tilde{P}}.}
$$

Compare this with <a href="#eq:diff_FL" data-reference-type="eqref" data-reference="eq:diff_FL">[eq:diff_FL]</a>: $s$ has been replaced by $s^{\beta}$, and $k^2$ by $|k|^{\alpha}$. The tail exponents of the underlying random walk now appear as the orders of the operators in transform space. The next question is which real-space operators correspond to $s^{\beta}$ and $|k|^{\alpha}$.

<figure id="fig:trajectories">
<img src="/images/articles/fractional-diffusion-ctrw/fig1_trajectories.png" style="width:95.0%" />
<figcaption>Brownian walk (<span class="math inline"><em>α</em> = 2</span>, Gaussian jumps, 5000 steps) versus Lévy flight (<span class="math inline"><em>α</em> = 1.5</span>, heavy-tailed jumps, 5000 steps). The Brownian path fills space more or less uniformly, consistent with a finite jump variance and Gaussian propagator. The Lévy path illustrates the effect of the heavy-tailed jump distribution in <a href="#eq:heavy_tails" data-reference-type="eqref" data-reference="eq:heavy_tails">[eq:heavy_tails]</a>: local motion interrupted by occasional long flights.</figcaption>
</figure>

## Fractional Operators and the Fractional Diffusion Equation
### The Riemann--Liouville Fractional Integral and Derivative

The fractional integral is a generalization of the Cauchy formula for repeated integration. For integer $n$, the $n$-fold integral of $\phi$ from $a$ to $x$ can be written as a single convolution integral [1]:

$$
{}_a D_x^{-n}\,\phi = \frac{1}{(n-1)!}\int_a^x (x-y)^{n-1}\,\phi(y)\,dy.
$$

Replacing $(n-1)!$ with $\Gamma(\nu)$ extends this to non-integer order $\nu > 0$:

$$
{}_a D_x^{-\nu}\,\phi = \frac{1}{\Gamma(\nu)}\int_a^x (x-y)^{\nu-1}\,\phi(y)\,dy.
$$

The Riemann--Liouville fractional derivative of order $\alpha$ is then defined as an integer differentiation of a fractional integral [2]:

$$
{}_a D_x^{\alpha}\,\phi = \frac{d^m}{dx^m}\bigl[{}_a D_x^{-(m-\alpha)}\phi\bigr], \qquad m = \lceil \alpha \rceil,
$$

where $m$ is the smallest integer greater than $\alpha$. For $1 < \alpha \leq 2$, we have $m=2$ and the derivative takes the explicit form

$$
{}_a D_x^{\alpha}\,\phi = \frac{1}{\Gamma(2-\alpha)}\,\partial_x^2 \int_a^x \frac{\phi(y)}{(x-y)^{\alpha-1}}\,dy.
$$

For $0 < \alpha \leq 1$, one has $m=1$ and the second derivative above is replaced by a first derivative. In either case the operator is non-local: it depends on the values of $\phi$ over the entire interval $(a,x)$, not just at $x$.

<div class="example">

**Example 1**. The RL derivative of a power function with $a=0$: $\displaystyle {}_0 D_x^{\mu}\, x^{\lambda} = \frac{\Gamma(\lambda+1)}{\Gamma(\lambda - \mu + 1)}\,x^{\lambda - \mu}$, which reduces to the ordinary derivative for integer $\mu$.

</div>

A key property for Fourier analysis: on the semi-infinite domain $(-\infty, x)$, the Weyl fractional derivative satisfies ${}_{-\infty}D_x^{\mu}\,e^{ikx} = (ik)^{\mu}\,e^{ikx}$ [1].

### Left, Right, and Symmetric Derivatives

The RL derivative <a href="#eq:RL_deriv" data-reference-type="eqref" data-reference="eq:RL_deriv">[eq:RL_deriv]</a> integrates to the *left* of $x$. A right derivative, integrating over $(x,b)$, is defined analogously [2]:

$$
{}_x D_b^{\alpha}\,\phi = \frac{(-1)^m}{\Gamma(m-\alpha)}\,\partial_x^m \int_x^b \frac{\phi(y)}{(y-x)^{\alpha+1-m}}\,dy.
$$

The general spatial fractional operator is a weighted sum $D_x^{\alpha} = w^{-}\,{}_a D_x^{\alpha} + w^{+}\,{}_x D_b^{\alpha}$, where $w^{\pm}$ control left-right asymmetry. The symmetric Riesz derivative on $(-\infty,\infty)$ is defined as [2]:

$$
D_{|x|}^{\alpha} = \frac{-1}{2\cos(\pi\alpha/2)}\bigl[{}_{-\infty}D_x^{\alpha} + {}_x D_{\infty}^{\alpha}\bigr],
$$

and its Fourier transform, for $0 < \alpha < 2$, gives

$$
\mathcal{F}\bigl[D_{|x|}^{\alpha}\,\phi\bigr] = -|k|^{\alpha}\,\hat{\phi}(k,t).
$$

To derive <a href="#eq:riesz_FT" data-reference-type="eqref" data-reference="eq:riesz_FT">[eq:riesz_FT]</a>, apply the Fourier transform directly using the Weyl eigenvalue relations ${}_{-\infty}D_x^{\alpha}e^{ikx}=(ik)^{\alpha}e^{ikx}$ and ${}_xD_{\infty}^{\alpha}e^{ikx}=(-ik)^{\alpha}e^{ikx}$ [1]. For any real $k$, writing $ik=|k|e^{i(\pi/2)\operatorname{sgn}(k)}$ and $-ik=|k|e^{-i(\pi/2)\operatorname{sgn}(k)}$, one has

$$
(ik)^{\alpha}+(-ik)^{\alpha}
  = |k|^{\alpha}\!\left(e^{i\pi\alpha\operatorname{sgn}(k)/2}+e^{-i\pi\alpha\operatorname{sgn}(k)/2}\right)
  = 2|k|^{\alpha}\cos\!\left(\frac{\pi\alpha}{2}\right).
$$

Applying the Fourier transform to the Riesz operator therefore gives

$$
\mathcal{F}\bigl[D_{|x|}^{\alpha}\phi\bigr]
  = \frac{-1}{2\cos(\pi\alpha/2)}\bigl[(ik)^{\alpha}+(-ik)^{\alpha}\bigr]\hat{\phi}(k)
  = \frac{-1}{2\cos(\pi\alpha/2)}\cdot 2|k|^{\alpha}\cos\!\left(\frac{\pi\alpha}{2}\right)\hat{\phi}(k)
  = -|k|^{\alpha}\hat{\phi}(k),
$$

confirming <a href="#eq:riesz_FT" data-reference-type="eqref" data-reference="eq:riesz_FT">[eq:riesz_FT]</a>. The prefactor $-1/(2\cos(\pi\alpha/2))$ in the definition of the Riesz operator is the constant needed to cancel the cosine and yield the Fourier symbol $-|k|^{\alpha}$. This holds for the full range $0 < \alpha < 2$, which is important because the plasma case study of del-Castillo-Negrete *et al.* uses $\alpha = 3/4 < 1$.

### The Caputo Time Derivative

For the time direction, the RL time derivative has the Laplace transform $\mathcal{L}$, which involves the initial value of a fractional integral of $\phi$ rather than $\phi$ itself. This is not suitable for initial-value problems. The Caputo derivative resolves this by switching the order of differentiation and integration [2]:

$$
{}^{C}_{0}D_t^{\beta}\,\phi = \frac{1}{\Gamma(1-\beta)}\int_0^t \frac{\partial_{\tau}\phi(x,\tau)}{(t-\tau)^{\beta}}\,d\tau, \qquad 0 < \beta < 1.
$$

Its Laplace transform is

$$
\mathcal{L}\bigl[{}^{C}_{0}D_t^{\beta}\,\phi\bigr] = s^{\beta}\,\tilde{\phi}(s) - s^{\beta-1}\,\phi(0),
$$

To derive <a href="#eq:caputo_LT" data-reference-type="eqref" data-reference="eq:caputo_LT">[eq:caputo_LT]</a>, write the Caputo derivative <a href="#eq:caputo" data-reference-type="eqref" data-reference="eq:caputo">[eq:caputo]</a> as the time convolution ${}^{C}_{0}D_t^{\beta}\phi = ({\partial_t\phi})*g$ where $g(t)=t^{-\beta}/\Gamma(1-\beta)$. By the Laplace convolution theorem,

$$
\mathcal{L}\bigl[{}^{C}_{0}D_t^{\beta}\phi\bigr]
  = \mathcal{L}[\partial_t\phi]\cdot\mathcal{L}[g].
$$

The first factor is $\mathcal{L}[\partial_t\phi]=s\tilde{\phi}(s)-\phi(0)$. For the second, the substitution $u=st$ gives

$$
\mathcal{L}[t^{-\beta}]
  = \int_0^{\infty}e^{-st}t^{-\beta}\,dt
  = s^{\beta-1}\int_0^{\infty}e^{-u}u^{-\beta}\,du
  = \Gamma(1-\beta)\,s^{\beta-1},
$$

so $\mathcal{L}[g]=s^{\beta-1}$. Combining and expanding:

$$
\mathcal{L}\bigl[{}^{C}_{0}D_t^{\beta}\phi\bigr]
  = s^{\beta-1}\bigl(s\tilde{\phi}(s)-\phi(0)\bigr)
  = s^{\beta}\tilde{\phi}(s) - s^{\beta-1}\phi(0),
$$

which is <a href="#eq:caputo_LT" data-reference-type="eqref" data-reference="eq:caputo_LT">[eq:caputo_LT]</a>, and depends directly on $\phi(0)$. The Caputo derivative of a constant is zero, unlike the RL derivative. This is necessary for well-defined steady-state solutions.

### Assembling the Equation

We had from the CTRW continuum limit, equation <a href="#eq:fde_FL" data-reference-type="eqref" data-reference="eq:fde_FL">[eq:fde_FL]</a>:

$$
s^{\beta}\,\hat{\tilde{P}} - s^{\beta-1} = -\chi\,|k|^{\alpha}\,\hat{\tilde{P}}.
$$

From <a href="#eq:caputo_LT" data-reference-type="eqref" data-reference="eq:caputo_LT">[eq:caputo_LT]</a>, the left side is the Fourier-Laplace transform of ${}^{C}_{0}D_t^{\beta} P$ with $P(x,0)=\delta(x)$. From <a href="#eq:riesz_FT" data-reference-type="eqref" data-reference="eq:riesz_FT">[eq:riesz_FT]</a>, the right side is $\chi$ times the transform of $D_{|x|}^{\alpha} P$. Inverting:

$$
\boxed{{}^{C}_{0}D_t^{\beta}\,P = \chi\,D_{|x|}^{\alpha}\,P.}
$$

This is the fractional diffusion equation. At $\alpha=2$, $\beta=1$ the Caputo derivative reduces to $\partial_t$ and the Riesz derivative to $\partial_x^2$, recovering ordinary diffusion.

<figure id="fig:ctrw_ensemble">
<img src="/images/articles/fractional-diffusion-ctrw/fig2_ctrw_ensemble.png" style="width:96.0%" />
<figcaption>CTRW simulation with <span class="math inline"><em>α</em> = 1.5</span>, <span class="math inline"><em>β</em> = 1</span> (Markovian Lévy flights, 10<span>,</span>000 particles). (a) A single trajectory showing local motion interrupted by long flights. (b) The pdf of particle displacements broadens with time but remains non-Gaussian. (c) The tails of the pdf at <span class="math inline"><em>t</em> = 1000</span>, plotted on log-log axes, are consistent with the algebraic decay <span class="math inline"><em>P</em> ∼ |<em>x</em>|<sup>−(1 + <em>α</em>)</sup></span> predicted by the fractional Green’s function <a href="#eq:tail_decay" data-reference-type="eqref" data-reference="eq:tail_decay">[eq:tail_decay]</a>. (d) Self-similar collapse: when each pdf is rescaled by <span class="math inline"><em>t</em><sup>1/<em>α</em></sup></span> and plotted against <span class="math inline"><em>η</em> = <em>x</em>/<em>t</em><sup>1/<em>α</em></sup></span>, the curves collapse closely onto the analytical <span class="math inline"><em>α</em></span>-stable density <span class="math inline"><em>L</em><sub><em>α</em></sub>(<em>η</em>)</span> (black dashed line). This is consistent with the large-scale limit described by <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a>.</figcaption>
</figure>

### Properties of the Solution

The Fourier--Laplace transform of <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a>, with initial condition $G(x,0)=\delta(x)$ so that $\hat{G}(k,0)=1$, is precisely <a href="#eq:fde_FL" data-reference-type="eqref" data-reference="eq:fde_FL">[eq:fde_FL]</a>. Solving algebraically for $\hat{\tilde{G}}$:

$$
\hat{\tilde{G}}(k,s) = \frac{s^{\beta-1}}{s^{\beta}+\chi|k|^{\alpha}}.
$$

Inverting the Laplace transform uses the Mittag-Leffler identity $\mathcal{L}[E_{\beta}(-ct^{\beta})]=s^{\beta-1}/(s^{\beta}+c)$, which follows from the series $E_{\beta}(-ct^{\beta})=\sum_{n=0}^{\infty}(-c)^n t^{\beta n}/\Gamma(\beta n+1)$ and the standard transform $\mathcal{L}[t^{\beta n}]=\Gamma(\beta n+1)/s^{\beta n+1}$:

$$
\mathcal{L}[E_{\beta}(-ct^{\beta})]
  = \sum_{n=0}^{\infty}\frac{(-c)^n}{\Gamma(\beta n+1)}\cdot\frac{\Gamma(\beta n+1)}{s^{\beta n+1}}
  = \frac{1}{s}\sum_{n=0}^{\infty}\!\left(\!\frac{-c}{s^{\beta}}\right)^{\!n}
  = \frac{s^{\beta-1}}{s^{\beta}+c}.
$$

Setting $c=\chi|k|^{\alpha}$ in <a href="#eq:green_FL" data-reference-type="eqref" data-reference="eq:green_FL">[eq:green_FL]</a> therefore gives

$$
\hat{G}(k,t) = E_{\beta}\!\left(-\chi|k|^{\alpha}t^{\beta}\right).
$$

For the parameter choice used here, $\alpha>\beta$, and the corresponding Green's function is a proper probability density [2]; in the plasma case, $\alpha=3/4>\beta=1/2$. The self-similar form of the Green's function of <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a> now follows. To see the scaling explicitly, suppose $G(x,t) = t^{-\nu} K(x/t^{\nu})$ for some exponent $\nu$ and profile $K$. Substituting into the Fourier transform and changing variables $\eta = x/t^{\nu}$ gives $\hat{G}(k,t) = \hat{K}(kt^{\nu})$. For this to equal $E_{\beta}(-\chi|k|^{\alpha}t^{\beta})$ from <a href="#eq:green_Fourier" data-reference-type="eqref" data-reference="eq:green_Fourier">[eq:green_Fourier]</a>, the argument $kt^{\nu}$ must absorb all $t$-dependence; this requires $|kt^{\nu}|^{\alpha} \propto |k|^{\alpha}t^{\beta}$, which forces $\nu\alpha = \beta$, i.e. $\nu = \beta/\alpha$. The full scaling factor follows from normalisation $\int G\,dx = 1$. Since $\hat{G}$ depends on $k$ and $t$ only through the combination $\chi|k|^{\alpha}t^{\beta} = |k(\chi^{1/\beta}t)^{\beta/\alpha}|^{\alpha}$, the inverse Fourier transform must satisfy $G(x,t)=(\chi^{1/\beta}t)^{-\beta/\alpha}K(\eta)$ with similarity variable

$$
G(x,t) = (\chi^{1/\beta}\,t)^{-\beta/\alpha}\,K(\eta), \qquad \eta = x\,(\chi^{1/\beta}\,t)^{-\beta/\alpha},
$$

where the profile $K$ is the inverse Fourier transform of $\hat{K}(q)=E_{\beta}(-|q|^{\alpha})$, i.e., $K(\eta)=(1/\pi)\int_0^{\infty}\cos(\eta z)\,E_{\beta}(-z^{\alpha})\,dz$ [2]. Two asymptotic regimes characterize $K$: near the origin, $K(\eta) \sim A/\eta^{1-\alpha} + B$ (a weak cusp for $\alpha < 1$), and for large $|\eta|$,

$$
K(\eta) \sim \frac{C}{\eta^{1+\alpha}}, \qquad C = \frac{1}{\pi}\frac{\Gamma(1+\alpha)}{\Gamma(1+\beta)}\sin\frac{\pi\alpha}{2}.
$$

The large-$|\eta|$ tail of $K$ follows from the small-$|q|$ behaviour of $\hat{K}$. Using the power-series definition

$$
E_{\beta}(-z)=\sum_{n=0}^{\infty}\frac{(-z)^n}{\Gamma(\beta n+1)},
$$

we obtain, for small $z$,

$$
E_{\beta}(-z)=1-\frac{z}{\Gamma(1+\beta)}+O(z^2).
$$

Substituting $z=|q|^\alpha$ gives

$$
\hat{K}(q)=E_{\beta}(-|q|^\alpha)
  =1-\frac{|q|^\alpha}{\Gamma(1+\beta)}+O(|q|^{2\alpha}),
$$

so the leading non-analytic term is $-|q|^\alpha/\Gamma(1+\beta)$. The Tauberian theorem for Fourier transforms [1] states that a function whose Fourier transform behaves as $-A|q|^{\alpha}$ near $q=0$ has algebraic tails $A\Gamma(1+\alpha)\sin(\pi\alpha/2)/(\pi|\eta|^{1+\alpha})$; setting $A=1/\Gamma(1+\beta)$ gives $C=\Gamma(1+\alpha)\sin(\pi\alpha/2)/(\pi\Gamma(1+\beta))$, confirming <a href="#eq:tail_decay" data-reference-type="eqref" data-reference="eq:tail_decay">[eq:tail_decay]</a>.

An important caveat concerns the moments. Formally, the $n$-th moment of the self-similar propagator scales as

$$
\langle |x|^n \rangle \sim t^{n\beta/\alpha},
$$

so the similarity exponent $\nu = \beta/\alpha$ determines the transport regime: $\nu = 1/2$ for ordinary diffusion, $\nu > 1/2$ for superdiffusion, $\nu < 1/2$ for subdiffusion. However, because $K(\eta) \sim \eta^{-(1+\alpha)}$ for large $\eta$, the integrand $\eta^n K(\eta) \sim \eta^{n-1-\alpha}$ diverges for $n \geq \alpha$ when integrated over $(-\infty, \infty)$ [2]. In particular, for $\alpha < 2$ the mean squared displacement is not defined on the infinite line. Del-Castillo-Negrete *et al.* handle this by introducing a finite spatial cutoff, which is physically natural since real systems always have a bounded domain [2]. The moments that do remain well-defined are the fractional moments $\langle |x|^{\delta} \rangle$ for $\delta < \alpha$, which are finite and scale as $t^{\delta\beta/\alpha}$.

<figure id="fig:mittag_leffler">
<img src="/images/articles/fractional-diffusion-ctrw/fig3_mittag_leffler.png" style="width:84.0%" />
<figcaption>The Mittag-Leffler function <span class="math inline"><em>E</em><sub><em>β</em></sub>(−<em>t</em>)</span> for several values of <span class="math inline"><em>β</em></span>, computed via integral representation. For <span class="math inline"><em>β</em> = 1</span> it reduces to <span class="math inline"><em>e</em><sup>−<em>t</em></sup></span> (exponential decay). For <span class="math inline"><em>β</em> &lt; 1</span> it decays algebraically as <span class="math inline"> ∼ <em>t</em><sup>−1</sup>/<em>Γ</em>(1 − <em>β</em>)</span> at large <span class="math inline"><em>t</em></span> (dashed lines), rather than exponentially. This is the temporal analogue of the heavy spatial tails in <a href="#eq:tail_decay" data-reference-type="eqref" data-reference="eq:tail_decay">[eq:tail_decay]</a>: both arise from the non-Markovian memory encoded by the Caputo fractional time derivative. The Mittag-Leffler function also appears in the Green’s function through <a href="#eq:green" data-reference-type="eqref" data-reference="eq:green">[eq:green]</a>.</figcaption>
</figure>

## Discussion and Conclusion
### The Plasma Case Study

Del-Castillo-Negrete *et al.* [2] simulated 25,000 tracer particles in 3D resistive pressure-gradient-driven turbulence. The turbulence produces $E\times B$ eddies that trap particles, and avalanche-like instabilities that launch them on long radial flights. Both effects are visible in the tracer orbits (their Figure 2). The measured pdf of radial displacements has tails decaying as $|x|^{-1.75}$, giving $\alpha \approx 3/4$. The similarity exponent, measured from the collapse of the pdf under rescaling by $t^{\nu}$, is $\nu \approx 2/3$, which with $\nu = \beta/\alpha$ requires $\beta = 1/2$. With $\chi = 0.09$, the fractional model <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a> reproduces both the pdf shape and the self-similar collapse. Note that because $\alpha = 3/4 < 1$, the mean squared displacement of the fractional Green's function is not finite on the full line, and the moment scaling reported in [2] relies on the finite spatial extent of the simulation domain acting as a natural cutoff.

This case is interesting because $\alpha < 1$ places it outside the regime where the RL derivative takes the more familiar $m=2$ form <a href="#eq:RL_explicit" data-reference-type="eqref" data-reference="eq:RL_explicit">[eq:RL_explicit]</a>. The Riesz derivative is still well-defined for this value through its Fourier transform property <a href="#eq:riesz_FT" data-reference-type="eqref" data-reference="eq:riesz_FT">[eq:riesz_FT]</a>, and the derivation from the CTRW in Section <a href="#sec:ctrw" data-reference-type="ref" data-reference="sec:ctrw">2</a> does not require $\alpha > 1$.

The subdiffusion case $\alpha = 2$, $\beta < 1$ visible in Figure <a href="#fig:transport_regimes" data-reference-type="ref" data-reference="fig:transport_regimes">5</a> (right column) is worth isolating, as it clarifies the role of the temporal fractional order in the absence of any spatial anomaly. Setting $\alpha = 2$ in <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a> gives ${}^{C}_{0}D_t^{\beta} P = \chi\,\partial_x^2 P$: the spatial operator is the ordinary Laplacian, but the Caputo time derivative introduces non-Markovian memory through the convolution in <a href="#eq:caputo" data-reference-type="eqref" data-reference="eq:caputo">[eq:caputo]</a>. The Green's function <a href="#eq:green" data-reference-type="eqref" data-reference="eq:green">[eq:green]</a> reduces to $G(x,t) = t^{-\beta/2} K(\eta)$ with $\eta = x/t^{\beta/2}$, and the MSD grows as $\langle x^2\rangle \sim t^{\beta} < t$ for $\beta < 1$, that is, slower than ordinary diffusion. The connection to Figure <a href="#fig:mittag_leffler" data-reference-type="ref" data-reference="fig:mittag_leffler">4</a> is direct: the Fourier transform $\hat{G}(k,t) = E_{\beta}(-\chi k^2 t^{\beta})$ decays as a Mittag-Leffler function in time at fixed $k$. At large $t$, the asymptotic $E_{\beta}(-\chi k^2 t^{\beta}) \sim (\chi k^2 t^{\beta})^{-1}/\Gamma(1-\beta)$ corresponds to the algebraic relaxation visible in Figure <a href="#fig:mittag_leffler" data-reference-type="ref" data-reference="fig:mittag_leffler">4</a> for $\beta < 1$. The slowdown arises entirely from the divergent mean waiting time $\langle\tau\rangle$: the spatial jump distribution remains Gaussian, and only the waiting-time distribution is anomalous.

<figure id="fig:transport_regimes">
<img src="/images/articles/fractional-diffusion-ctrw/fig4_transport_regimes.png" />
<figcaption>Three transport regimes simulated via CTRW. Top row: pdfs at a fixed time, with analytical curves overlaid where available. Bottom row: moment scaling on log-log axes. Left column: normal diffusion (<span class="math inline"><em>α</em> = 2, <em>β</em> = 1</span>), with Gaussian pdf and linear MSD scaling <span class="math inline">⟨<em>x</em><sup>2</sup>⟩ ∼ <em>t</em></span>. Centre column: Lévy flights (<span class="math inline"><em>α</em> = 1.5, <em>β</em> = 1</span>), where the MSD diverges and instead the fractional moment <span class="math inline">⟨|<em>x</em>|<sup>1.0</sup>⟩</span> is plotted (since <span class="math inline">1.0 &lt; <em>α</em> = 1.5</span>, this moment is finite), scaling as <span class="math inline"><em>t</em><sup><em>δ</em>/<em>α</em></sup> = <em>t</em><sup>0.67</sup></span>. Right column: subdiffusion (<span class="math inline"><em>α</em> = 2, <em>β</em> = 0.7</span>), where the MSD is finite but grows sublinearly as <span class="math inline"><em>t</em><sup>0.7</sup></span>. All three regimes are described by <a href="#eq:fde_final" data-reference-type="eqref" data-reference="eq:fde_final">[eq:fde_final]</a> with different <span class="math inline">(<em>α</em>, <em>β</em>)</span>.</figcaption>
</figure>

### Connection to Experimental Diagnostics

Transfer-entropy studies have also been discussed in CTRW language. Van Milligen *et al.* [8] describe "slow" and "fast" transport channels, with the latter consistent with jump-like propagation across minor transport barriers. This is qualitatively compatible with a heavy-tailed jump distribution, but it is not a derivation of the fractional model.

The NLCC method of Ding *et al.* [9] addresses a different question: directional asymmetry in nonlinear coupling between radially separated probe signals. Such asymmetry may be compared with an imbalance between left and right spatial fractional derivatives, but I did not find such a connection in the literature. The NLCC construction itself is based on phase-space reconstruction rather than fractional calculus.

They are discussed further in the author's physics thesis.

### Limitations of the Fractional Approximation

The fractional diffusion equation is an asymptotic result: it describes the large-scale, long-time behaviour of the CTRW, and can converge slowly at finite times or near the origin. Barkai [6] showed that the exact CTRW propagator at $x = 0$ may differ from the fractional Green's function over a long transient, because the fractional equation captures only the leading term of the asymptotic expansions <a href="#eq:psi_heavy" data-reference-type="eqref" data-reference="eq:psi_heavy">[eq:psi_heavy]</a>--<a href="#eq:lam_heavy" data-reference-type="eqref" data-reference="eq:lam_heavy">[eq:lam_heavy]</a>. Higher-order corrections in $s$ and $k$ are discarded in taking the continuum limit, and these corrections matter most near the origin and at early times.

Separately, Rodriguez-Fernandez *et al.* [10] showed that cold-pulse phenomena in tokamaks, which have been cited as evidence of nonlocal transport, can be reproduced by local quasilinear turbulent transport models (specifically the TGLF-SAT1 saturation rule). This does not invalidate the fractional framework, but it does mean that apparently nonlocal transport signatures in experiments are not by themselves enough to establish genuinely nonlocal transport. The fractional model is a reduced model: it compactly captures certain statistical features of anomalous transport, not the underlying first-principles dynamics.

### Conclusion

We derived the fractional diffusion equation from the CTRW by showing that heavy-tailed jump and waiting-time distributions produce, in the continuum limit, transform-space operators $|k|^{\alpha}$ and $s^{\beta}$ that correspond to the Riesz and Caputo fractional derivatives respectively. The fractional orders are not free parameters: they are fixed by the tail exponents of the underlying stochastic process. The plasma-turbulence results of del-Castillo-Negrete *et al.* provide a case where this framework is tested against simulation data, and the CTRW simulations presented here reproduce the main qualitative signatures: algebraic tails, self-similar collapse, and, for moments of order below $\alpha$, anomalous scaling. The natural extension is to bounded domains, where the truncated RL derivatives become singular at the boundaries and require Caputo-style regularization [11]. That problem is directly relevant to radial transport modelling in confined plasmas.

<div id="refs" class="references csl-bib-body" entry-spacing="0">

<div id="ref-metzlerRandomWalksGuide2000" class="csl-entry">

[1] R. Metzler and J. Klafter, "The random walk's guide to anomalous diffusion: A fractional dynamics approach," *Physics Reports*, 339, no. 1, 1--77 (2000), doi:[10.1016/S0370-1573(00)00070-3](https://doi.org/10.1016/S0370-1573(00)00070-3), <https://linkinghub.elsevier.com/retrieve/pii/S0370157300000703>.

</div>

<div id="ref-del-castillo-negreteFractionalDiffusionPlasma2004" class="csl-entry">

[2] D. del-Castillo-Negrete, B. A. Carreras, and V. E. Lynch, "Fractional diffusion in plasma turbulence," *Physics of Plasmas*, 11, no. 8, 3854--3864 (2004), doi:[10.1063/1.1767097](https://doi.org/10.1063/1.1767097), <https://pubs.aip.org/pop/article/11/8/3854/261828/Fractional-diffusion-in-plasma-turbulence>.

</div>

<div id="ref-carrerasProgressAnomalousTransport1997" class="csl-entry">

[3] B. A. Carreras, "Progress in anomalous transport research in toroidal magnetic confinement devices," *IEEE Transactions on Plasma Science*, 25, no. 6, 1281--1321 (1997), doi:[10.1109/27.650902](https://doi.org/10.1109/27.650902), <http://ieeexplore.ieee.org/document/650902/>.

</div>

<div id="ref-chenDiffusionResistivity2016" class="csl-entry">

[4] F. F. Chen, *Introduction to plasma physics and controlled fusion*, (2016), doi:[10.1007/978-3-319-22309-4](https://doi.org/10.1007/978-3-319-22309-4), <http://link.springer.com/10.1007/978-3-319-22309-4>.

</div>

<div id="ref-montrollRandomWalksLattices1965" class="csl-entry">

[5] E. W. Montroll and G. H. Weiss, "Random Walks on Lattices. II," *Journal of Mathematical Physics*, 6, no. 2, 167--181 (1965), doi:[10.1063/1.1704269](https://doi.org/10.1063/1.1704269), <https://pubs.aip.org/jmp/article/6/2/167/232167/Random-Walks-on-Lattices-II>.

</div>

<div id="ref-barkaiCTRWPathwaysFractional2002" class="csl-entry">

[6] E. Barkai, "CTRW pathways to the fractional diffusion equation," *Chemical Physics*, 284, no. 1--2, 13--27 (2002), doi:[10.1016/S0301-0104(02)00533-5](https://doi.org/10.1016/S0301-0104(02)00533-5), <https://linkinghub.elsevier.com/retrieve/pii/S0301010402005335>.

</div>

<div id="ref-del-castillo-negreteNondiffusiveTransportPlasma2005" class="csl-entry">

[7] D. del-Castillo-Negrete, B. A. Carreras, and V. E. Lynch, "Nondiffusive Transport in Plasma Turbulence: A Fractional Diffusion Approach," *Physical Review Letters*, 94, no. 6, 065003 (2005), doi:[10.1103/PhysRevLett.94.065003](https://doi.org/10.1103/PhysRevLett.94.065003), <https://link.aps.org/doi/10.1103/PhysRevLett.94.065003>.

</div>

<div id="ref-vanmilligenRadialPropagationHeat2019" class="csl-entry">

[8] B. Van Milligen, B. Carreras, L. García, and J. Nicolau, "The Radial Propagation of Heat in Strongly Driven Non-Equilibrium Fusion Plasmas," *Entropy*, 21, no. 2, 148 (2019), doi:[10.3390/e21020148](https://doi.org/10.3390/e21020148), <https://www.mdpi.com/1099-4300/21/2/148>.

</div>

<div id="ref-dingNonlinearRadialCorrelation1997" class="csl-entry">

[9] W. X. Ding, C. Xiao, D. White, M. Elia, and A. Hirose, "Nonlinear Radial Correlation of Electrostatic Fluctuations in the STOR-M Tokamak," *Physical Review Letters*, 79, no. 13, 2458--2461 (1997), doi:[10.1103/PhysRevLett.79.2458](https://doi.org/10.1103/PhysRevLett.79.2458), <https://link.aps.org/doi/10.1103/PhysRevLett.79.2458>.

</div>

<div id="ref-rodriguez-fernandezExplainingColdPulseDynamics2018" class="csl-entry">

[10] P. Rodriguez-Fernandez, A. E. White, N. T. Howard, B. A. Grierson, G. M. Staebler, J. E. Rice, X. Yuan, N. M. Cao, A. J. Creely, M. J. Greenwald, A. E. Hubbard, J. W. Hughes, J. H. Irby, and F. Sciortino, "Explaining Cold-Pulse Dynamics in Tokamak Plasmas Using Local Turbulent Transport Models," *Physical Review Letters*, 120, no. 7, 075001 (2018), doi:[10.1103/PhysRevLett.120.075001](https://doi.org/10.1103/PhysRevLett.120.075001), <https://link.aps.org/doi/10.1103/PhysRevLett.120.075001>.

</div>

<div id="ref-del-castillo-negreteFractionalDiffusionModels2006" class="csl-entry">

[11] D. del-Castillo-Negrete, "Fractional diffusion models of nonlocal transport," *Physics of Plasmas*, 13, no. 8, 082308 (2006), doi:[10.1063/1.2336114](https://doi.org/10.1063/1.2336114), <https://pubs.aip.org/pop/article/13/8/082308/901076/Fractional-diffusion-models-of-nonlocal-transport>.

</div>

</div>
