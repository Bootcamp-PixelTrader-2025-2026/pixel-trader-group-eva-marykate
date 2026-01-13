```mermaid
erDiagram

    JEUX {
        int id_jeux PK
        varchar titre
        int annee_sortie
        string etat
        int id_emplacement FK
        float valeur_estimee
        float prix_achat
    }

    PLATEFORME {
        int id_plateforme PK
        varchar nom
    }

    JEUX_PLATEFORME {
        int id_jeux FK
        int id_plateforme FK
    }

    EMPLACEMENT {
        int id_emplacement PK
        varchar nom
    }

    JEUX ||--|{ JEUX_PLATEFORME : has
    PLATEFORME ||--|{ JEUX_PLATEFORME : has
    JEUX }|--|| EMPLACEMENT : est_place
