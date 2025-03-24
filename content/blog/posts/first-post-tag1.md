---
layout: blog
title: Optimisations de RSA OAEP avec le CRT et la fonction de Carmichael
date: 2025-03-24T19:04:00.000Z
video:
tags:
  - Cryptographie
  - Informatique
  - Mathématique
---

RSA (Rivest-Shamir-Adleman) est l'un des systèmes de chiffrement asymétrique les plus utilisés aujourd'hui. Cependant, son implémentation peut être optimisée de plusieurs manières pour améliorer ses performances sans compromettre sa sécurité. Parmi ces optimisations, nous explorerons l'utilisation du **théorème des restes chinois (CRT)** et de la **fonction indicatrice de Carmichael**.

## 1. Rappel sur RSA OAEP

Le schéma RSA avec **Optimal Asymmetric Encryption Padding (OAEP)** est utilisé pour améliorer la sécurité du chiffrement RSA brut en ajoutant un schéma de masquage afin d'éviter certaines attaques (ex : attaque de texte chiffré choisi). Le chiffrement se fait de la manière suivante :

- Génération de la clé RSA :

  - Choix de deux nombres premiers \( p \) et \( q \)
  - Calcul du module \( N = p \times q \)
  - Calcul de l'indicatrice d'Euler :
    \[
    \varphi(N) = (p - 1) \times (q - 1)
    \]
  - Choix d'un exposant public \( e \)
  - Calcul de l'exposant privé \( d \) tel que :
    \[
    d \times e \equiv 1 \mod \varphi(N)
    \]

- Chiffrement :
  \[
  C = M^e \mod N
  \]
- Déchiffrement :
  \[
  M = C^d \mod N
  \]

L'opération d'exponentiation modulaire avec un grand exposant \( d \) est coûteuse en calcul, ce qui justifie l'utilisation d'optimisations.

---

## 2. Optimisation avec le théorème des restes chinois (CRT)

Le **théorème des restes chinois** permet d'accélérer le déchiffrement en réduisant la taille des calculs modulaires.
Plutôt que d'exécuter l'exponentiation modulaire directement sur \( N \), on la réalise séparément sur \( p \) et \( q \) :

- Calcul des clés privées réduites :
  \[
  d_p = d \mod (p - 1)
  \]
  \[
  d_q = d \mod (q - 1)
  \]
- Calcul des résultats intermédiaires :
  \[
  M_p = C^{d_p} \mod p
  \]
  \[
  M_q = C^{d_q} \mod q
  \]
- Reconstruction du message avec l'algorithme de recomposition de **Garner** :
  \[
  M = M_q + q \times ( (M_p - M_q) \times q^{-1} \mod p )
  \]

Cette technique réduit le coût du déchiffrement d'un facteur **4×** environ, car les calculs sont réalisés sur des nombres deux fois plus petits.

---

## 3. Utilisation de la fonction indicatrice de Carmichael

L'indicatrice de **Carmichael** \( \lambda(N) \) est une alternative à \( \varphi(N) \) qui permet de minimiser l'exposant privé \( d \). Elle est définie par :

\[
\lambda(N) = \text{PPCM}(p - 1, q - 1)
\]

L'intérêt est que \( \lambda(N) \) est plus petit que \( \varphi(N) \), ce qui réduit la taille de \( d \) et accélère le déchiffrement.

En remplaçant \( \varphi(N) \) par \( \lambda(N) \) dans le calcul de \( d \), nous obtenons :

\[
d = e^{-1} \mod \lambda(N)
\]

L'utilisation conjointe de **CRT et Carmichael** permet donc d'optimiser RSA en réduisant à la fois la taille des calculs et leur complexité.

---

## 4. Conclusion

Ces optimisations sont particulièrement utiles pour les applications embarquées ou nécessitant un déchiffrement rapide (ex : signatures numériques). Elles permettent de :

✅ Réduire drastiquement le temps de déchiffrement avec **CRT**

✅ Minimiser l'exposant privé avec **Carmichael**, accélérant les calculs

✅ Maintenir la sécurité du schéma RSA tout en améliorant ses performances

Ces techniques sont intégrées dans les implémentations modernes de RSA pour garantir un chiffrement efficace et sécurisé.
