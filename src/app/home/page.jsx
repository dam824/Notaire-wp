"use client"
import SplitText from "@/components/SplitText";
import { getHeroImage } from "@/inc/wpData";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(()=> {
    const fetchHeroImage= async () => {
      const imageUrl = await getHeroImage();
      setHeroImage(imageUrl);
    };

    fetchHeroImage();
  }, []);


  return (
    <main>
    {/*   section hero  */}
    <section className="relative w-full h-[832px]">
      {/* Image de fond */}
     {heroImage ? (
       <Image
       src={heroImage}
       alt="Bureau d'avocat"
       layout="fill" // Permet de couvrir toute la section
       objectFit="cover" // Remplit sans déformer l'image
       className="absolute inset-0 w-full h-full"
       priority
      />
     ):(
      <div className="w-full h-full bg-gray-200 animate-pulse" />
     )}
{/*      texte au dessus de l'image  */}
 <div className="absolute bottom-10 left-10  text-white  ">
  <h1 className="font-[IvyPresto Display] text-[70px] font-normal leading-[90px]">
  <SplitText
    text="Plus qu’un avocat,"
    delay={50}
    animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
    animationTo={{ opacity: 1, transform: "translateY(0)" }}
    easing="easeOutCubic"
    className="text-[70px] font-normal leading-[90px] font-ivy block"
  />
  <br />
  <SplitText
    text="votre partenaire au quotidien"
    delay={100} // Décalage pour une belle animation
    animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
    animationTo={{ opacity: 1, transform: "translateY(0)" }}
    easing="easeOutCubic"
    className="text-[70px] font-normal leading-[90px] font-ivy block"
  />
  </h1>
  <span className="mt-4 font-[TT Hoves] text-[30px] font-normal leading-[50px]">
  <SplitText
    text="L’expertise des grands cabinets, l’accessibilité d’un cabinet à taille humaine."
    delay={20}
    animationFrom={{ opacity: 0, transform: "translateY(50px)" }}
    animationTo={{ opacity: 1, transform: "translateY(0)" }}
    easing="easeOutCubic"
    className="text-[30px] font-normal leading-[90px] font-hoves block"
  />
  </span>
  
 </div>
     
    </section>
 

    </main>
    
  )
}

export default Home