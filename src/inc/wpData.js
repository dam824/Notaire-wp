const WP_API_BASE = "https://darkgrey-eland-667117.hostingersite.com/wp-json";

/**
 * Récupère l'URL du logo WordPress via la médiathèque
 */
export async function getSiteLogo() {
    try {
        //console.log("📡 Récupération des médias WordPress...");

        //Étape 1 : Récupérer tous les médias (on force 100 résultats max)
        const mediaResponse = await fetch(`${WP_API_BASE}/wp/v2/media?per_page=100`);
        if (!mediaResponse.ok) throw new Error("Erreur lors de la récupération des médias");

        const mediaData = await mediaResponse.json();
       // console.log("📡 Médias récupérés :", mediaData);

        //Étape 2 : Filtrer pour trouver le logo (basé sur les noms courants)
        const logoMedia = mediaData.find(media =>
            media.title.rendered.toLowerCase().includes("logo") ||  // Fichiers avec "logo"
            media.slug.toLowerCase().includes("logo") ||            // Slug avec "logo"
            media.source_url.toLowerCase().includes("logo")         // URL contenant "logo"
        );

        if (!logoMedia) {
            console.warn("⚠️ Aucun logo trouvé dans la médiathèque WordPress");
            return null;
        }

       // console.log("✅ Logo trouvé :", logoMedia.source_url);

        //Étape 3 : Retourner l'URL du fichier logo
        return logoMedia.source_url || null;

    } catch (error) {
        console.error("Erreur API:", error);
        return null;
    }
}

/**
 * Récupère l'URL du hero image WordPress via la médiathèque
 */

export async function getHeroImage() {
    console.log('Début de getHeroImage');  // Log de démarrage
    
    try {
        const mediaResponse = await fetch(`${WP_API_BASE}/wp/v2/media?per_page=100`);
        console.log('Statut de la réponse:', mediaResponse.status); // Vérifie le statut HTTP
        
        if (!mediaResponse.ok) {
            throw new Error(`Erreur HTTP: ${mediaResponse.status}`);
        }

        const mediaData = await mediaResponse.json();
        console.log('Données brutes reçues:', mediaData); // Voir toutes les données

        // Cherchons spécifiquement l'image
        const heroImage = mediaData.find(media => {
            return media.title.rendered.includes('hero-image') || 
                   media.slug.includes('image-15')
        });

        console.log('Image trouvée:', heroImage); // Voir si l'image est trouvée

        if (heroImage) {
            console.log('URL de l\'image:', heroImage.source_url);
            return heroImage.source_url;
        } else {
            console.log('Aucune image trouvée avec ce nom');
            return null;
        }

    } catch (error) {
        console.error('Erreur complète:', error);
        return null;
    }
}

// Test immédiat
getHeroImage().then(url => {
    console.log("URL finale:", url);
});