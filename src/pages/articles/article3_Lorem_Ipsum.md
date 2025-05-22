---
title: "Lorem Ipsum Generator"
date: "2025-05-14"
author: "Jayneel Parikh"
tags: ['stochastic','python',"test"]
category: "Technical"
featured\_image: "/images/markov-chain.png"
description: "We explore transition matrices by making a simple Lorem Ipsum generator that accepts any root text. This a test article and is subject to be updated to test the implementation of new features on this blog. This article is incomplete in it's explanation."
layout: ../../layouts/ArticleLayout.astro
---------------------------------------------

<div class = 'remarks'>
A few years back in my CompPhys 2 course my group (s.o Jackson Morphew) had come up with a 'Next-Word generator' inspired by 'PageRank'. Essentially it was a shitty gibberish generator. Much more recently, as I was reading (read: struggling through) Don Quixote, I was struck by it's unique syntax and sentence structure. I took it upon myself to clean our old code and make a Don Quixote based Lorem Ipsum generator, to atleast make the code semi-useful (in the loosest definition of useful). Will anyone ever want this? No. But here it is. 
</div>

## Table of contents

## Introduction

This article outlines the use of transition matrices to generate a sequence of words based on a root text. We use a First-Order Markov process with the acknowledgement that better results can be found with Hidden Markov Models. In this article we will generate a Lorem Ipsum style text given the root text of Don Quixote. 




## Notation and Assumptions

* Let $\mathcal{V} = \{w_1, w_2, \dots, w_N\}$ be the space of $N$ distinct words, extracted in order of first appearance from a given root text.
* The input corpus is a sequence of $L$ tokens:

  $$
    \mathbf{w} = (w^{(1)}, w^{(2)}, \dots, w^{(L)}),
    \quad w^{(i)} \in \mathcal{V}
  $$
* We assume a first-order Markov property:

  $$
    P\bigl(w^{(i+1)} \mid w^{(1)}, \dots, w^{(i)}\bigr)
    = P\bigl(w^{(i+1)} \mid w^{(i)}\bigr)
  $$

## Extracting Bigrams and Counting Frequencies

Define the set of all observed ordered pairs (bigrams) including a self-pair at the end:

$$
\mathcal{B} = 
\bigl\{(w^{(i)}, w^{(i+1)}) : i = 1,\dots,L-1\bigr\}
\cup \{(w^{(L)}, w^{(L)})\}
$$

Let $C: \mathcal{V}\times\mathcal{V} \to \mathbb{N}_0$ be *the* count function:

$$
C\bigl(u, v\bigr) = \#\bigl\{\,i : (w^{(i)}, w^{(i+1)}) = (u,v)\bigr\}
$$

In code, we build:

```python
def read_text(text):
    """Read a text string and extract unique words."""
    word_list = []
    unique_words = []

    for word in text.split():
        word_list.append(word)
        if word not in unique_words:
            unique_words.append(word)

    return word_list, unique_words

```

and then count each bigram $(u,v)$ to obtain $C(u,v)$.

## Transition Probabilities

For each $u\in\mathcal{V}$, define the total outgoing count:

$$
T(u) = \sum_{v\in\mathcal{V}} C(u, v)
$$

Then the conditional probability of transitioning from $u$ to $v$ is:

$$
P\bigl(v\mid u\bigr) = \frac{C(u, v)}{T(u)},
\quad \text{for all } u,v \in \mathcal{V}
$$

This yields a probability distribution over the next word given the current word.

```python

def calculate_transition_probabilities(word_list, unique_words):
    """Calculate transition probabilities between words."""
    # Create pairs of consecutive words
    word_pairs = []
    i = 0
    while i <= len(word_list) - 1:
        if i < len(word_list) - 1:
            word_pairs.append((word_list[i], word_list[i + 1]))
        else:
            word_pairs.append((word_list[i], word_list[i]))
        i += 1

    # Count occurrences of each word pair
    unique_pairs = []
    pair_counts = []

    for word_pair in word_pairs:
        if word_pair not in unique_pairs:
            unique_pairs.append(word_pair)
            pair_counts.append(1)
        else:
            index = unique_pairs.index(word_pair)
            pair_counts[index] += 1

    # Calculate transition probabilities
    pair_probabilities = [0] * len(pair_counts)

    for index, target_pair in enumerate(unique_pairs):
        matching_pairs = []
        matching_counts = []
        first_word_list = []

        for index2, pair in enumerate(unique_pairs):
            if target_pair[0] == pair[0]:
                matching_pairs.append(pair)
                matching_counts.append(pair_counts[unique_pairs.index(pair)])
                first_word_list.append(pair)

        for first_word in first_word_list:
            pair_index = unique_pairs.index(first_word)
            match_index = matching_pairs.index(first_word)
            pair_probabilities[pair_index] = matching_counts[match_index] / np.sum(matching_counts)

    return word_pairs, unique_pairs, pair_counts, pair_probabilities



```
## The Transition Matrix

We index words by $1 \le i,j \le N$ such that $w_i =$ $\mathcal{V}[i]$. Then define the transition matrix $\mathbf{P} \in \mathbb{R}^{N\times N}$ with entries:

$$
P_{ij} = P\bigl(w_j \mid w_i\bigr) = \frac{C(w_i, w_j)}{\sum_{k=1}^N C(w_i, w_k)}.
$$

In code:

```python
def build_transition_matrix(pair_probabilities, unique_words, unique_pairs):
    """Build transition matrix from word pair probabilities."""
    # Create matrix with dimensions [num_unique_words x num_unique_words]
    matrix = np.zeros((len(unique_words), len(unique_words)))

    # Fill matrix with transition probabilities
    for index, pair in enumerate(unique_pairs):
        row = unique_words.index(pair[0])
        col = unique_words.index(pair[1])
        matrix[row][col] = pair_probabilities[index]
    return matrix

```

## Sampling the Next Word

Given the current word $w^{(t)} = w_i$ (index $i$), we draw the next word index $j$ with probability:

$$
P\bigl(w^{(t+1)} = w_j \mid w^{(t)} = w_i\bigr)
= P_{ij}.
$$

Concretely, if $\boldsymbol{P}_{i,:}$ denotes row $i$ of $\mathbf{P}$, then

$$
\Pr\bigl(j = k\bigr) = P_{i,k},
\quad k=1,\dots,N
$$

```python
def generate_text(initial_word, transition_matrix, unique_words, iterations=10):
    """Generate text using Markov chain model."""
    predicted_text = []
    current_word = initial_word
    predicted_text.append(current_word)

    row_number = unique_words.index(current_word)
    for _ in range(iterations):
        next_word = nprand.choice(unique_words, p=transition_matrix[row_number])
        predicted_text.append(next_word)
        current_word = next_word
        row_number = unique_words.index(current_word)

    predicted_text = " ".join(predicted_text)
    return predicted_text
```
## Generated Text

And finally we get:
<div class = 'remarks'>

 "The farmer, “call on Sundays, made more firmly bound to him, one in the Manchegan horizon, when out or would adopt the people who were to see and fixing bars of Gaul. Master Andres,” said to see if he mounted, and that they seemed in him, moreover, that this was like heretics.” “So say in these troutlets enough,” said the novice knight that ye shall be she might be, all that, his sword, which he could not thy captive Abindarraez gave Rocinante was like all the carrier’s head that he felt himself he mounted, and went off the landlord, seeing the shield until by my heart tell the Taverns of people, who, as the ceremonial of the artifice of La Mancha, the approach of chivalry with his thinking, lofty, sonorous, and deducted three of the bed is true,” said it was saying his intention of his horn to have been at last the ground, and said, the blood-lettings when he was it was proceeding to dark, poring over with such fury and the two gay damsels who hath to-day righted the man blustering in and covered all was—give him that this sort the valiant and matters little,” replied that special purpose. But these words and quiet, saying to give him, fell on Saturdays, lentils on their lucidity of in the title of himself, “If, for the oath on a thing so wantonly lashing that he considered, he bore them to set forth in and robbing everyone he might from both hands and took, because as he come in remembrance this sort the spot, and backpiece, but Pedro Alonso your High Magnificence,” replied Don Quixote braced his stirrups, got to stay two hours only, while his hand on this harangue of knighthood before him away to the youth that ye can against"
</div>

## Final Thoughts
-   This implementation relies heavily on linear searches (using .index() multiple times), which would be inefficient for large texts. Using dictionaries or hash maps instead of repeated linear searches would significantly improve performance.
- Overall the use of transition matrices in this way is wholly inefficient for larger data sets.
- calculate_transition_probabilities is a long function and could be broken up into smaller functions
- We do not cover a comparison to the classic Lorem Ipsum in any way. 
- It would be interesting to explore how text size affects generation quality.

### Mathematical Summary

1. **Bigram counts:** $C(u,v)$.
2. **Outgoing totals:** $T(u)=\sum_v C(u,v)$.
3. **Transition probability:**
   $P_{ij} = \frac{C(w_i,w_j)}{T(w_i)}.$
4. **Sampling update:**
   $w^{(t+1)}=w_j\text{ with probability }P_{i,j},\quad i=\mathrm{index}(w^{(t)}).$

---

## Citations
1. Cervantes Saavedra, M. de. (2003). Don Quixote (E. Grossman, Trans.). HarperCollins. (Original work published 1605)

