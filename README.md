# WEB-3 / FastBuyCrypto 

<img src="./img/crypto.com_.jpeg" alt="CRONOS">

-------

## Introduction :

Ceci est un "bot" d'achat de crypto sur un DEx.

Techniquement ce n'est pas vraiment un bot, c'est juste un programme qui va diminuer la perte de temps que l'on peut avoir avec MetaMask par exemple. (animation, confirmation, etc).

Le code de base vient d'ici : https://github.com/CryptoRobotFr/WEB-3.git

Comme il était en open source je me suis permis de l'adapter sur la Blockchain **Cronos**.

-------

## Initiation : 

- Au préalable avoir **Node.js** d'installé sur votre machine.

  - https://nodejs.org/en/
- Installer **Ethers** et **prompt-sync** avec la commande **npm install**
- Changer les champs **private_key** & **public_key** avec ses informations.
- Lancer **snipe-achat-CRO.js** et inscrire l'adresse du contrat du token souhaité.

Par défaut le programme va faire un échange de 1 **WCRO** (= 1 **CRO**).
Il va aussi utiliser un **gwei** de 5000.

Pour choisir le nombre de **WCRO** à swap, il faut changer la variable : **amountToSwap**.

Pour modifier le **gwei** il faut changer la donnée de la variable : **gwei**

-------

## Authors :

- CryptoRobotFr
- 0xdlo

-------

## Ideas :

- Choisir le nombre de **WCRO** à swap directement dans le terminal + **gwei** aussi.
- Interface graphique ?
- Vérifier le **contrat** avant tout swap.
- Vérifier la **liquidité** avant tout swap.
- Vérifier la **supply** avant tout swap.

-------

## /!\

**Ne pas oublier d'avoir toujours un minimum de CRO sur le wallet pour éviter tout problème d'insuffisance de liquidité.**

-------

**Le swap fonctionne 1 fois sur 3 donc je suis en train de chercher une solution. 
Cela doit venir de la fonction appelée par l'interface du contrat. Elle est sûrment différente sur la blockchain CRONOS**


<img src="./img/wip.png" alt="WIP">