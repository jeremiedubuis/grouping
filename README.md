# Visualisation et contribution de réseaux

Cette application permet de contribuer des individus et des groupes. 
ELle permet d'associer des étiquettes à ces entités et de les lier entre elles.

Une fois ces données contribuées elle permet d'afficher une représentation graphique sous forme d'un
réseau généré par la librairie [Vis.js](https://github.com/visjs/vis-network)

## Stack technique

Cette librairie utilise un serveur [Node.js](https://nodejs.org/en/) et le framework  [Next.js](https://nextjs.org/) 
pour le rendu front-end.

L'api Node.js se connecte à un serveur [MySql](https://www.mysql.com/fr/).

## Configuration
Toutes les options de configuration sont dans le fichier [.env](.env)


## Utilisateur par défaut

A l'initialisation de la base de données, l'utilisateur par défaut est
```
Nom d'utilisateur: admin
Mot de passe: admin
```