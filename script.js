/* ============================================
   IMAGE FALLBACK & ERROR HANDLING
   ============================================ */
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
function onImgError(el) {
  if (!el.dataset.fallbackApplied) {
    el.dataset.fallbackApplied = '1';
    el.src = FALLBACK_IMG;
  } else {
    const wrap = el.closest('.dest-card__img-wrap, .wishlist-item') || el.parentElement;
    if (wrap && !wrap.classList.contains('skeleton-shimmer')) {
      wrap.classList.add('skeleton-shimmer');
      el.style.display = 'none';
      if (el.classList.contains('detail-banner')) wrap.style.minHeight = '300px';
    }
  }
}

/* ============================================
   DESTINATION DATA POOL — each with explicit image
   ============================================ */
const _destPool = [
  // ASIA
  { name: "Bali, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "27°C", desc: "Tropical & Humid", bestSeason: "Apr – Oct" } },
  { name: "Kyoto, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌸", temp: "15°C", desc: "Mild & Pleasant", bestSeason: "Mar – May" } },
  { name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌊", temp: "30°C", desc: "Hot & Tropical", bestSeason: "Nov – Apr" } },
  { name: "Angkor Wat, Cambodia", country: "Cambodia", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌴", temp: "28°C", desc: "Hot & Humid", bestSeason: "Nov – Feb" } },
  { name: "Ha Long Bay, Vietnam", country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "25°C", desc: "Warm & Humid", bestSeason: "Oct – Apr" } },
  { name: "Bhutan", country: "Bhutan", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "10°C", desc: "Cool Mountain", bestSeason: "Mar – May" } },
  { name: "Ubud, Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌿", temp: "26°C", desc: "Tropical", bestSeason: "Apr – Oct" } },
  { name: "Palawan, Philippines", country: "Philippines", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "28°C", desc: "Tropical", bestSeason: "Nov – May" } },
  { name: "Chiang Mai, Thailand", country: "Thailand", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌤️", temp: "25°C", desc: "Warm & Dry", bestSeason: "Nov – Feb" } },
  { name: "Hoi An, Vietnam", country: "Vietnam", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏮", temp: "24°C", desc: "Warm & Humid", bestSeason: "Feb – Apr" } },
  { name: "Lombok, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1570789210967-2cac24f169ab?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "28°C", desc: "Tropical", bestSeason: "May – Sep" } },
  { name: "Luang Prabang, Laos", country: "Laos", image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌤️", temp: "25°C", desc: "Warm & Pleasant", bestSeason: "Nov – Mar" } },
  { name: "Tokyo, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🗼", temp: "16°C", desc: "Mild & Humid", bestSeason: "Mar – May" } },
  { name: "Cappadocia, Turkey", country: "Turkey", image: "https://images.unsplash.com/photo-1609137144822-777ec80587d6?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🎈", temp: "12°C", desc: "Semi-Arid", bestSeason: "Apr – Jun" } },
  { name: "Petra, Jordan", country: "Jordan", image: "https://images.unsplash.com/photo-1579606032834-bfeb123b3799?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏜️", temp: "20°C", desc: "Arid & Dry", bestSeason: "Mar – May" } },
  { name: "Kathmandu, Nepal", country: "Nepal", image: "https://images.unsplash.com/photo-1569443693539-175ea4f62825?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "18°C", desc: "Subtropical", bestSeason: "Oct – Mar" } },
  { name: "Siem Reap, Cambodia", country: "Cambodia", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "☀️", temp: "29°C", desc: "Hot & Humid", bestSeason: "Nov – Feb" } },
  { name: "Goa, India", country: "India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌊", temp: "28°C", desc: "Tropical Monsoon", bestSeason: "Nov – Feb" } },
  { name: "Himalayas, Nepal", country: "Nepal", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "5°C", desc: "Cold Alpine", bestSeason: "Mar – May" } },
  { name: "Seoul, South Korea", country: "South Korea", image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🍂", temp: "13°C", desc: "Continental", bestSeason: "Sep – Nov" } },
  { name: "Raja Ampat, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1570789210967-2cac24f169ab?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🐠", temp: "28°C", desc: "Tropical", bestSeason: "Oct – Apr" } },
  { name: "Varanasi, India", country: "India", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🕉️", temp: "26°C", desc: "Humid Subtropical", bestSeason: "Oct – Mar" } },
  { name: "Komodo Island, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🦎", temp: "29°C", desc: "Tropical", bestSeason: "Apr – Dec" } },
  { name: "Zhangjiajie, China", country: "China", image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🌫️", temp: "16°C", desc: "Humid Subtropical", bestSeason: "Apr – Oct" } },
  { name: "Marina Bay, Singapore", country: "Singapore", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🌤️", temp: "27°C", desc: "Equatorial", bestSeason: "Year-round" } },
  { name: "Phuket, Thailand", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "29°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Hanoi, Vietnam", country: "Vietnam", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🍂", temp: "23°C", desc: "Humid Subtropical", bestSeason: "Oct – Dec" } },
  { name: "Sapa, Vietnam", country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🌫️", temp: "15°C", desc: "Cool & Misty", bestSeason: "Mar – May" } },
  { name: "Boracay, Philippines", country: "Philippines", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌊", temp: "28°C", desc: "Tropical", bestSeason: "Nov – May" } },
  { name: "Jaipur, India", country: "India", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏰", temp: "25°C", desc: "Semi-Arid", bestSeason: "Oct – Mar" } },
  { name: "El Nido, Philippines", country: "Philippines", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏝️", temp: "27°C", desc: "Tropical", bestSeason: "Nov – May" } },

  // EUROPE
  { name: "Paris, France", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🌤️", temp: "18°C", desc: "Mild & Charming", bestSeason: "Apr – Jun" } },
  { name: "Santorini, Greece", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "☀️", temp: "25°C", desc: "Warm & Sunny", bestSeason: "May – Sep" } },
  { name: "Swiss Alps, Switzerland", country: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "8°C", desc: "Cool & Alpine", bestSeason: "Jun – Sep" } },
  { name: "Amalfi Coast, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🍋", temp: "22°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Barcelona, Spain", country: "Spain", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "☀️", temp: "20°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Dubrovnik, Croatia", country: "Croatia", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🏖️", temp: "22°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Iceland Golden Circle", country: "Iceland", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "❄️", temp: "2°C", desc: "Arctic", bestSeason: "Jun – Aug" } },
  { name: "Tuscany, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🍷", temp: "18°C", desc: "Mild Mediterranean", bestSeason: "Apr – Oct" } },
  { name: "Norwegian Fjords, Norway", country: "Norway", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌊", temp: "10°C", desc: "Cool Maritime", bestSeason: "Jun – Aug" } },
  { name: "Prague, Czech Republic", country: "Czech Republic", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏰", temp: "10°C", desc: "Continental", bestSeason: "May – Sep" } },
  { name: "Amsterdam, Netherlands", country: "Netherlands", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌷", temp: "10°C", desc: "Maritime", bestSeason: "Apr – Oct" } },
  { name: "Lake Bled, Slovenia", country: "Slovenia", image: "https://images.unsplash.com/photo-1583946099379-f9c4c8b1aec0?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🏔️", temp: "12°C", desc: "Alpine", bestSeason: "May – Sep" } },
  { name: "Cinque Terre, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🌊", temp: "19°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Hallstatt, Austria", country: "Austria", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🏔️", temp: "8°C", desc: "Alpine", bestSeason: "May – Sep" } },
  { name: "Edinburgh, Scotland", country: "Scotland", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏰", temp: "9°C", desc: "Maritime", bestSeason: "May – Sep" } },
  { name: "Mykonos, Greece", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "☀️", temp: "24°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Bruges, Belgium", country: "Belgium", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🍺", temp: "10°C", desc: "Maritime", bestSeason: "Apr – Oct" } },
  { name: "Swiss Riviera, Montreux", country: "Switzerland", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🎶", temp: "12°C", desc: "Lakeside", bestSeason: "May – Sep" } },
  { name: "Meteora, Greece", country: "Greece", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "⛰️", temp: "14°C", desc: "Continental", bestSeason: "Apr – Oct" } },
  { name: "Sintra, Portugal", country: "Portugal", image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏰", temp: "16°C", desc: "Mild Maritime", bestSeason: "Apr – Oct" } },
  { name: "Kotor, Montenegro", country: "Montenegro", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "⚓", temp: "18°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Lofoten, Norway", country: "Norway", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌌", temp: "4°C", desc: "Arctic Maritime", bestSeason: "Jun – Aug" } },
  { name: "Plitvice Lakes, Croatia", country: "Croatia", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "💧", temp: "12°C", desc: "Continental", bestSeason: "May – Sep" } },
  { name: "Sognefjord, Norway", country: "Norway", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🚣", temp: "8°C", desc: "Cool Maritime", bestSeason: "Jun – Aug" } },
  { name: "Positano, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🌺", temp: "21°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Rome, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏛️", temp: "20°C", desc: "Mediterranean", bestSeason: "Apr – Oct" } },

  // MIDDLE EAST
  { name: "Dubai, UAE", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🏙️", temp: "33°C", desc: "Hot & Arid", bestSeason: "Nov – Mar" } },

  // AMERICAS
  { name: "Machu Picchu, Peru", country: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d043e42?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏔️", temp: "12°C", desc: "Highland", bestSeason: "Apr – Oct" } },
  { name: "New York City, USA", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🗽", temp: "12°C", desc: "Continental", bestSeason: "Apr – Jun" } },
  { name: "Rio de Janeiro, Brazil", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🎉", temp: "25°C", desc: "Tropical", bestSeason: "Dec – Mar" } },
  { name: "Patagonia, Argentina", country: "Argentina", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏔️", temp: "5°C", desc: "Cold & Windy", bestSeason: "Nov – Mar" } },
  { name: "Cancun, Mexico", country: "Mexico", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌊", temp: "27°C", desc: "Tropical", bestSeason: "Dec – Apr" } },
  { name: "Banff, Canada", country: "Canada", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "3°C", desc: "Continental", bestSeason: "Jun – Aug" } },
  { name: "Galapagos Islands, Ecuador", country: "Ecuador", image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🐢", temp: "26°C", desc: "Tropical", bestSeason: "Jun – Nov" } },
  { name: "Santorini, Mykonos Cruise", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🚢", temp: "23°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Costa Rica Rainforest", country: "Costa Rica", image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🦜", temp: "27°C", desc: "Tropical", bestSeason: "Dec – Apr" } },
  { name: "Sedona, Arizona", country: "USA", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏜️", temp: "22°C", desc: "Desert", bestSeason: "Mar – May" } },
  { name: "Havana, Cuba", country: "Cuba", image: "https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🚗", temp: "26°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Napa Valley, USA", country: "USA", image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🍷", temp: "18°C", desc: "Mediterranean", bestSeason: "Apr – Oct" } },
  { name: "Tulum, Mexico", country: "Mexico", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏝️", temp: "27°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Yellowstone, USA", country: "USA", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🌋", temp: "5°C", desc: "Continental", bestSeason: "Jun – Sep" } },
  { name: "Mendoza, Argentina", country: "Argentina", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🍷", temp: "15°C", desc: "Semi-Arid", bestSeason: "Mar – May" } },
  { name: "Cartagena, Colombia", country: "Colombia", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🏰", temp: "28°C", desc: "Tropical", bestSeason: "Dec – Apr" } },
  { name: "Buenos Aires, Argentina", country: "Argentina", image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "💃", temp: "17°C", desc: "Humid Subtropical", bestSeason: "Mar – May" } },
  { name: "Atacama Desert, Chile", country: "Chile", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌌", temp: "15°C", desc: "Arid Desert", bestSeason: "Mar – Nov" } },
  { name: "Vancouver, Canada", country: "Canada", image: "https://images.unsplash.com/photo-1559511260-66a68e7f3704?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🌲", temp: "10°C", desc: "Maritime", bestSeason: "Jun – Sep" } },
  { name: "San Francisco, USA", country: "USA", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌉", temp: "14°C", desc: "Mild Maritime", bestSeason: "Sep – Nov" } },
  { name: "Uyuni Salt Flats, Bolivia", country: "Bolivia", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🪞", temp: "10°C", desc: "Highland", bestSeason: "Dec – Mar" } },
  { name: "Playa del Carmen, Mexico", country: "Mexico", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌊", temp: "27°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Whistler, Canada", country: "Canada", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "⛷️", temp: "-2°C", desc: "Alpine", bestSeason: "Dec – Mar" } },
  { name: "Lake Titicaca, Peru", country: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d043e42?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏔️", temp: "14°C", desc: "Highland", bestSeason: "May – Sep" } },
  { name: "Scottsdale, Arizona", country: "USA", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🌵", temp: "24°C", desc: "Desert", bestSeason: "Oct – Apr" } },
  { name: "Aspen, Colorado", country: "USA", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "⛷️", temp: "0°C", desc: "Alpine", bestSeason: "Dec – Mar" } },
  { name: "Key West, Florida", country: "USA", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌅", temp: "26°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Grand Canyon, USA", country: "USA", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏜️", temp: "18°C", desc: "Arid", bestSeason: "Mar – May" } },
  { name: "Charleston, South Carolina", country: "USA", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏛️", temp: "18°C", desc: "Humid Subtropical", bestSeason: "Mar – May" } },

  // AFRICA
  { name: "Serengeti, Tanzania", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦁", temp: "25°C", desc: "Tropical Savanna", bestSeason: "Jun – Oct" } },
  { name: "Marrakech, Morocco", country: "Morocco", image: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🕌", temp: "22°C", desc: "Semi-Arid", bestSeason: "Mar – May" } },
  { name: "Cape Town, South Africa", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🦁", temp: "18°C", desc: "Mediterranean", bestSeason: "Nov – Mar" } },
  { name: "Zanzibar, Tanzania", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏖️", temp: "28°C", desc: "Tropical", bestSeason: "Jun – Oct" } },
  { name: "Victoria Falls, Zambia", country: "Zambia", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "💧", temp: "22°C", desc: "Tropical", bestSeason: "May – Aug" } },
  { name: "Masai Mara, Kenya", country: "Kenya", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦒", temp: "24°C", desc: "Savanna", bestSeason: "Jul – Oct" } },
  { name: "Luxor, Egypt", country: "Egypt", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏛️", temp: "26°C", desc: "Desert", bestSeason: "Oct – Apr" } },
  { name: "Sahara Desert, Morocco", country: "Morocco", image: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏜️", temp: "20°C", desc: "Desert", bestSeason: "Oct – Apr" } },
  { name: "Djemaa el-Fna, Marrakech", country: "Morocco", image: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🎭", temp: "23°C", desc: "Semi-Arid", bestSeason: "Mar – May" } },
  { name: "Okavango Delta, Botswana", country: "Botswana", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🐘", temp: "25°C", desc: "Savanna", bestSeason: "May – Oct" } },
  { name: "Kruger National Park, South Africa", country: "South Africa", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦏", temp: "22°C", desc: "Subtropical", bestSeason: "May – Sep" } },
  { name: "Fez, Morocco", country: "Morocco", image: "https://images.unsplash.com/photo-1518730518541-d0843268c287?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🕌", temp: "20°C", desc: "Mediterranean", bestSeason: "Mar – May" } },
  { name: "Pyramids of Giza, Egypt", country: "Egypt", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🐪", temp: "25°C", desc: "Desert", bestSeason: "Oct – Apr" } },
  { name: "Madagascar", country: "Madagascar", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🦎", temp: "26°C", desc: "Tropical", bestSeason: "Apr – Nov" } },
  { name: "Namib Desert, Namibia", country: "Namibia", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏜️", temp: "18°C", desc: "Arid Desert", bestSeason: "May – Oct" } },
  { name: "Rwanda Gorilla Trek", country: "Rwanda", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦍", temp: "20°C", desc: "Tropical Highland", bestSeason: "Jun – Sep" } },
  { name: "Mozambique Islands", country: "Mozambique", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🐠", temp: "28°C", desc: "Tropical", bestSeason: "May – Nov" } },
  { name: "Ethiopian Highlands", country: "Ethiopia", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "⛰️", temp: "18°C", desc: "Highland", bestSeason: "Oct – Mar" } },
  { name: "Seychelles", country: "Seychelles", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🌴", temp: "28°C", desc: "Tropical", bestSeason: "Apr – May" } },
  { name: "Gorongosa, Mozambique", country: "Mozambique", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦁", temp: "25°C", desc: "Tropical Savanna", bestSeason: "May – Oct" } },
  { name: "Tunis, Tunisia", country: "Tunisia", image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏛️", temp: "20°C", desc: "Mediterranean", bestSeason: "Apr – Nov" } },
  { name: "Lake Malawi", country: "Malawi", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🐟", temp: "26°C", desc: "Tropical", bestSeason: "May – Oct" } },
  { name: "Bazaruto Archipelago, Mozambique", country: "Mozambique", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏝️", temp: "27°C", desc: "Tropical", bestSeason: "Apr – Nov" } },
  { name: "Volcanoes National Park, Rwanda", country: "Rwanda", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌋", temp: "16°C", desc: "Tropical Highland", bestSeason: "Jun – Sep" } },

  // OCEANIA
  { name: "Great Barrier Reef, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🐠", temp: "26°C", desc: "Tropical", bestSeason: "Jun – Oct" } },
  { name: "Queenstown, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏔️", temp: "10°C", desc: "Alpine", bestSeason: "Jun – Sep" } },
  { name: "Sydney, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌊", temp: "20°C", desc: "Humid Subtropical", bestSeason: "Sep – Nov" } },
  { name: "Bora Bora, French Polynesia", country: "French Polynesia", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🏝️", temp: "28°C", desc: "Tropical", bestSeason: "May – Oct" } },
  { name: "Milford Sound, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🌧️", temp: "8°C", desc: "Maritime", bestSeason: "Nov – Mar" } },
  { name: "Melbourne, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🎭", temp: "14°C", desc: "Oceanic", bestSeason: "Oct – Apr" } },
  { name: "Fiordland, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌲", temp: "7°C", desc: "Maritime", bestSeason: "Nov – Mar" } },
  { name: "Tasmania, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🐨", temp: "12°C", desc: "Oceanic", bestSeason: "Dec – Feb" } },
  { name: "Rotorua, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "♨️", temp: "12°C", desc: "Geothermal", bestSeason: "Year-round" } },
  { name: "Whitsundays, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "⛵", temp: "26°C", desc: "Tropical", bestSeason: "Apr – Nov" } },
  { name: "Cairns, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🐊", temp: "26°C", desc: "Tropical", bestSeason: "Jun – Oct" } },
  { name: "Abel Tasman, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏖️", temp: "14°C", desc: "Maritime", bestSeason: "Nov – Mar" } },
  { name: "Kakadu, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🐊", temp: "30°C", desc: "Tropical", bestSeason: "May – Oct" } },
  { name: "Cook Islands", country: "Cook Islands", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌺", temp: "27°C", desc: "Tropical", bestSeason: "May – Oct" } },
  { name: "Tongariro, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🌋", temp: "8°C", desc: "Alpine", bestSeason: "Dec – Mar" } },
  { name: "Lord Howe Island, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏝️", temp: "20°C", desc: "Subtropical", bestSeason: "Sep – May" } },
  { name: "Wanaka, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "8°C", desc: "Alpine", bestSeason: "Dec – Feb" } },
  { name: "Hamilton Island, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🏝️", temp: "25°C", desc: "Tropical", bestSeason: "Apr – Nov" } },
  { name: "Kaikoura, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🐋", temp: "10°C", desc: "Maritime", bestSeason: "Jun – Nov" } },
  { name: "Barossa Valley, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🍷", temp: "16°C", desc: "Mediterranean", bestSeason: "Mar – May" } },
  { name: "Punakaiki, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🌧️", temp: "10°C", desc: "Maritime", bestSeason: "Nov – Mar" } },
  { name: "Uluru, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏜️", temp: "28°C", desc: "Arid Desert", bestSeason: "Apr – Sep" } },
  { name: "Lake Wanaka, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏔️", temp: "9°C", desc: "Alpine", bestSeason: "Dec – Feb" } },
  { name: "Ningaloo Reef, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🐋", temp: "24°C", desc: "Arid Coastal", bestSeason: "Mar – Jul" } },

  // MORE FEATURED
  { name: "Petra, Jordan", country: "Jordan", image: "https://images.unsplash.com/photo-1579606032834-bfeb123b3799?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏜️", temp: "20°C", desc: "Arid", bestSeason: "Mar – May" } },
  { name: "Taj Mahal, India", country: "India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🕌", temp: "25°C", desc: "Semi-Arid", bestSeason: "Oct – Mar" } },
  { name: "Zanzibar Spice Island", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🌺", temp: "28°C", desc: "Tropical", bestSeason: "Jun – Oct" } },
  { name: "Galapagos Wildlife", country: "Ecuador", image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🐢", temp: "26°C", desc: "Tropical", bestSeason: "Jun – Nov" } },
  { name: "Cappadocia Balloons", country: "Turkey", image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🎈", temp: "12°C", desc: "Semi-Arid", bestSeason: "Apr – Jun" } },
  { name: "Northern Lights, Iceland", country: "Iceland", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌌", temp: "-2°C", desc: "Arctic", bestSeason: "Sep – Mar" } },
  { name: "Machu Picchu Trek", country: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d043e42?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "12°C", desc: "Highland", bestSeason: "Apr – Oct" } },
  { name: "Serengeti Migration", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "safari", weather: { icon: "🦓", temp: "25°C", desc: "Savanna", bestSeason: "Jul – Oct" } },
  { name: "Great Ocean Road, Australia", country: "Australia", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🌊", temp: "14°C", desc: "Oceanic", bestSeason: "Dec – Feb" } },
  { name: "Phi Phi Islands, Thailand", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏝️", temp: "29°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Zhangjiajie Glass Bridge", country: "China", image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🌉", temp: "16°C", desc: "Humid Subtropical", bestSeason: "Apr – Oct" } },
  { name: "Terracotta Warriors, China", country: "China", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "⚔️", temp: "14°C", desc: "Continental", bestSeason: "Mar – May" } },
  { name: "Ha Long Bay Cruise", country: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🚢", temp: "24°C", desc: "Tropical Monsoon", bestSeason: "Oct – Apr" } },
  { name: "Salar de Uyuni Mirror", country: "Bolivia", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🪞", temp: "10°C", desc: "Highland", bestSeason: "Dec – Mar" } },
  { name: "Iguazu Falls, Argentina", country: "Argentina", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "💧", temp: "22°C", desc: "Subtropical", bestSeason: "Mar – Nov" } },
  { name: "Cinque Terre Hike", country: "Italy", image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🥾", temp: "18°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Blue Lagoon, Iceland", country: "Iceland", image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "♨️", temp: "2°C", desc: "Geothermal", bestSeason: "Year-round" } },
  { name: "Angkor Wat Sunrise", country: "Cambodia", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🌅", temp: "28°C", desc: "Tropical", bestSeason: "Nov – Feb" } },
  { name: "Sossusvlei Dunes, Namibia", country: "Namibia", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏜️", temp: "20°C", desc: "Desert", bestSeason: "May – Oct" } },
  { name: "Ipanema Beach, Brazil", country: "Brazil", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🏖️", temp: "26°C", desc: "Tropical", bestSeason: "Dec – Mar" } },
  { name: "Plitvice Waterfalls, Croatia", country: "Croatia", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "💧", temp: "12°C", desc: "Continental", bestSeason: "May – Sep" } },
  { name: "Swiss Glacier Express", country: "Switzerland", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🚂", temp: "5°C", desc: "Alpine", bestSeason: "Jun – Sep" } },
  { name: "Galapagos Diving", country: "Ecuador", image: "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🤿", temp: "24°C", desc: "Tropical", bestSeason: "Jun – Nov" } },
  { name: "Amalfi Boat Tour", country: "Italy", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🛥️", temp: "22°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Kilimanjaro Summit", country: "Tanzania", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🏔️", temp: "0°C", desc: "Alpine", bestSeason: "Jan – Mar" } },
  { name: "Dubrovnik Game of Thrones", country: "Croatia", image: "https://images.unsplash.com/photo-1555990538-1e14e07a1970?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏰", temp: "20°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Phi Phi Beach Resort", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🌴", temp: "29°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
  { name: "Pompeii Ruins, Italy", country: "Italy", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80", category: "cultural", weather: { icon: "🏛️", temp: "18°C", desc: "Mediterranean", bestSeason: "Apr – Oct" } },
  { name: "Table Mountain, South Africa", country: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "⛰️", temp: "16°C", desc: "Mediterranean", bestSeason: "Nov – Mar" } },
  { name: "Tasman Glacier, New Zealand", country: "New Zealand", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🧊", temp: "4°C", desc: "Alpine", bestSeason: "Nov – Mar" } },
  { name: "Greek Island Hopping", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "beach", weather: { icon: "🚢", temp: "24°C", desc: "Mediterranean", bestSeason: "May – Oct" } },
  { name: "Komodo Dragon Trek", country: "Indonesia", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🦎", temp: "29°C", desc: "Tropical", bestSeason: "Apr – Dec" } },
  { name: "Raja Ampat Diving", country: "Indonesia", image: "https://images.unsplash.com/photo-1570789210967-2cac24f169ab?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🤿", temp: "28°C", desc: "Tropical", bestSeason: "Oct – Apr" } },
  { name: "Bora Bora Overwater Villa", country: "French Polynesia", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80", category: "luxury", weather: { icon: "🏝️", temp: "28°C", desc: "Tropical", bestSeason: "May – Oct" } },
  { name: "Mount Fuji, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80", category: "mountain", weather: { icon: "🗻", temp: "8°C", desc: "Alpine", bestSeason: "Jul – Aug" } },
  { name: "Santorini Sunset Cruise", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "romantic", weather: { icon: "🌅", temp: "23°C", desc: "Mediterranean", bestSeason: "May – Sep" } },
  { name: "Torres del Paine, Chile", country: "Chile", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", category: "adventure", weather: { icon: "🏔️", temp: "5°C", desc: "Cold & Windy", bestSeason: "Nov – Mar" } },
  { name: "Fuji Five Lakes, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏔️", temp: "10°C", desc: "Temperate", bestSeason: "Apr – Nov" } },
  { name: "Phi Phi Viewpoint, Thailand", country: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80", category: "nature", weather: { icon: "🏝️", temp: "29°C", desc: "Tropical", bestSeason: "Nov – Apr" } },
];

/* ============================================
   DATA GENERATOR — builds 100+ destinations
   ============================================ */
const _itineraryPool = {
  beach: [
    ["Arrival & beach welcome dinner","Snorkeling reef tour","Island hopping day trip","Sunset cruise & seafood BBQ","Beach yoga & spa day","Free day for water sports","Departure"],
    ["Airport transfer & resort check-in","Catamaran sail & snorkel","Deep-sea fishing excursion","Beach volleyball & bonfire night","Kayak mangrove tour","Leisure pool day, departure"],
    ["Welcome cocktail & beach stroll","Scuba diving certification","Sandbank picnic & photoshoot","Dolphin watching cruise","Windsurfing lessons","Spa & farewell dinner","Departure"]
  ],
  mountain: [
    ["Arrival & acclimatization hike","Summit attempt & glacier walk","Rest day & hot springs","Base camp trek","Ridge trail & photography","Descend & farewell dinner","Departure"],
    ["Scenic transfer & lodge check-in","Alpine meadow trek","Via ferrata climbing experience","Mountain biking trail","Lake swimming & picnic","Sunrise viewpoint hike","Departure"],
    ["Train journey to highlands","Guided nature walk","Rock climbing session","Waterfall rappelling","Stargazing camp night","Leisure morning, departure"]
  ],
  cultural: [
    ["Arrival & old town walking tour","Museum & gallery day","Cooking class & market tour","Temple & historical sites","Artisan workshop visit","Farewell cultural show","Departure"],
    ["Airport transfer & heritage walk","Historical monument tour","Traditional craft experience","Local food trail","Folk performance evening","Free day for shopping","Departure"],
    ["Welcome dinner & city orientation","UNESCO site visits","Calligraphy or pottery class","Ancient ruins exploration","Local festival or ceremony","Departure"]
  ],
  romantic: [
    ["Arrival with champagne welcome","Sunset dinner on the beach","Couples spa & massage","Private yacht cruise","Wine tasting at local vineyard","Farewell Michelin dinner","Departure"],
    ["Airport VIP transfer","Rooftop cocktails & city views","Horse-drawn carriage tour","Private cooking class","Hot air balloon at sunrise","Romantic boat ride, departure"],
    ["Resort check-in with flowers","Beachside couples yoga","Snorkeling hand-in-hand","Sunset cliff walk","Candlelit dinner under stars","Departure"]
  ],
  luxury: [
    ["Private jet transfer & villa check-in","Personal butler briefing","Yacht day trip with chef","Exclusive wine cellar tour","Private beach dinner","Helicopter scenic flight","Departure"],
    ["VIP airport lounge & limousine","5-star spa full day","Gourmet tasting menu dinner","Private island excursion","Luxury shopping experience","Farewell gala dinner","Departure"],
    ["Concierge welcome & suite tour","Private guided museum tour","Chauffeur city exploration","Rooftop infinity pool evening","Michelin chef cooking class","Departure"]
  ],
  safari: [
    ["Arrival at safari lodge & briefing","Morning game drive","Bush walk with tracker","Afternoon game drive","Bird watching & photo safari","Night safari & bush dinner","Departure"],
    ["Fly-in safari camp check-in","Full day savanna drive","River boat safari","Maasai village visit","Big Five tracking","Sunset cocktails in the bush","Departure"],
    ["Welcome at luxury tented camp","Dawn balloon safari","Bush breakfast experience","Predator tracking drive","Local community visit","Farewell bush braai","Departure"]
  ],
  adventure: [
    ["Arrival & gear fitting","Training & beginner session","Main adventure activity day","Second day challenge","Rest & recovery with views","Celebration dinner","Departure"],
    ["Transfer to base & orientation","First adventure stage","Climb/trek/paddle full day","Summit or endpoint attempt","Descent & hot springs","Farewell gathering","Departure"],
    ["Arrival & safety briefing","Practice session","Full-day guided adventure","Overnight camping experience","Morning exploration","Departure"]
  ],
  nature: [
    ["Arrival & nature center briefing","Morning guided nature walk","Afternoon wildlife observation","Photography workshop","Conservation project visit","Farewell & departure"],
    ["Transfer to eco-lodge","Canopy walk & bird watching","River rafting & waterfall hike","Evening nature documentary session","Sunrise birding walk","Departure"],
    ["Welcome at lodge & trail map","Full day hiking exploration","Wildlife tracking experience","Canoe & fishing afternoon","Stargazing night","Departure"]
  ]
};

function _pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function _randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function _randRating() { return (4.3 + Math.random() * 0.7).toFixed(1); }
function _randDuration(cat) {
  const map = { beach: [5,7,8,10], mountain: [5,7,8,10,12], cultural: [4,5,6,7], romantic: [4,5,6,7], luxury: [5,6,7,8,10], safari: [5,7,8,10], adventure: [5,7,8,10], nature: [4,5,6,7] };
  return _pick(map[cat] || [5,7]) + " Days";
}

function _generateDestinations() {
  const seen = new Set();
  const result = [];

  // 1. Add the original 6 hand-crafted destinations (ids 1–6)
  const originals = [
    { id: 1, name: "Bali, Indonesia", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80", category: "beach", price: 1299, rating: 4.9, reviews: 2847, duration: "7 Days", badge: "Trending", weather: { icon: "☀️", temp: "27°C", desc: "Tropical & Humid", bestSeason: "Apr – Oct" }, description: "Experience the Island of the Gods with lush rice terraces, ancient temples, vibrant culture, and pristine beaches.", itinerary: [{day:"Day 1",desc:"Arrival in Denpasar, transfer to Ubud. Evening rice terrace walk."},{day:"Day 2",desc:"Full-day temple tour: Tirta Empul, Gunung Kawi & Tegallalang Rice Terraces."},{day:"Day 3",desc:"Sacred Monkey Forest, Ubud Art Market, and traditional Balinese cooking class."},{day:"Day 4",desc:"Transfer to Seminyak. Beach afternoon, sunset at Tanah Lot Temple."},{day:"Day 5",desc:"Water sports day: snorkeling, surfing lessons, and banana boat ride."},{day:"Day 6",desc:"Day trip to Nusa Penida island. Kelingking Beach & Angel's Billabong."},{day:"Day 7",desc:"Leisure morning, spa treatment, departure transfer."}], inclusions: ["Airport Transfers","4-Star Hotel","Daily Breakfast","Temple Tours","Snorkeling Trip","Cooking Class"], exclusions: ["International Flights","Travel Insurance","Personal Expenses","Lunch & Dinner"] },
    { id: 2, name: "Kyoto, Japan", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80", category: "cultural", price: 1899, rating: 4.8, reviews: 1923, duration: "6 Days", badge: "Cultural", weather: { icon: "🌸", temp: "15°C", desc: "Mild & Pleasant", bestSeason: "Mar – May" }, description: "Step into Japan's cultural heart with Kyoto's mesmerizing temples, traditional geisha districts, and serene bamboo groves.", itinerary: [{day:"Day 1",desc:"Arrival at Kansai Airport, bullet train to Kyoto. Evening Gion district walk."},{day:"Day 2",desc:"Fushimi Inari Shrine, Kiyomizu-dera Temple, and Sannenzaka Street."},{day:"Day 3",desc:"Arashiyama Bamboo Grove, Monkey Park, Tenryu-ji Temple, and river boat ride."},{day:"Day 4",desc:"Tea ceremony experience, Nishiki Market food tour, and kimono rental."},{day:"Day 5",desc:"Day trip to Nara: Todai-ji Temple, deer park, and Kasuga Taisha."},{day:"Day 6",desc:"Morning meditation at a Zen temple, departure."}], inclusions: ["Bullet Train Pass","Traditional Ryokan Stay","Tea Ceremony","Kimono Rental","Temple Entries","Guide"], exclusions: ["Flights","Travel Insurance","Meals","Personal Shopping"] },
    { id: 3, name: "Paris, France", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", category: "romantic", price: 2199, rating: 4.9, reviews: 3201, duration: "5 Days", badge: "Romantic", weather: { icon: "🌤️", temp: "18°C", desc: "Mild & Charming", bestSeason: "Apr – Jun" }, description: "The City of Light awaits with iconic landmarks, world-class cuisine, charming cafés, and unforgettable sunsets along the Seine.", itinerary: [{day:"Day 1",desc:"Arrival in Paris, Seine river cruise with champagne, Eiffel Tower at night."},{day:"Day 2",desc:"Louvre Museum tour, Tuileries Garden, Palais Royal, and Seine-side dining."},{day:"Day 3",desc:"Montmartre walking tour, Sacré-Cœur, wine tasting."},{day:"Day 4",desc:"Day trip to Versailles: Palace tour, gardens, Marie Antoinette's Estate."},{day:"Day 5",desc:"Le Marais exploration, farewell Michelin-star lunch, departure."}], inclusions: ["Boutique Hotel","River Cruise","Museum Pass","Versailles Tour","Wine Tasting","Farewell Dinner"], exclusions: ["Flights","Travel Insurance","Some Meals","Shopping"] },
    { id: 4, name: "Santorini, Greece", country: "Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80", category: "romantic", price: 2499, rating: 4.8, reviews: 2156, duration: "6 Days", badge: "Most Loved", weather: { icon: "☀️", temp: "25°C", desc: "Warm & Sunny", bestSeason: "May – Sep" }, description: "Watch the world's most beautiful sunsets from whitewashed villages perched on volcanic cliffs.", itinerary: [{day:"Day 1",desc:"Arrival, transfer to Oia, sunset welcome dinner."},{day:"Day 2",desc:"Caldera hike from Fira to Oia, wine tasting at cliffside winery."},{day:"Day 3",desc:"Catamaran cruise: hot springs, Red Beach, White Beach, BBQ lunch."},{day:"Day 4",desc:"Akrotiri archaeological site, Perissa Black Sand Beach afternoon."},{day:"Day 5",desc:"Traditional cooking class, local market tour, Oia sunset."},{day:"Day 6",desc:"Leisure morning, farewell brunch, departure."}], inclusions: ["Cave Hotel Stay","Caldera Hike Guide","Catamaran Cruise","Cooking Class","Wine Tasting","All Transfers"], exclusions: ["Flights","Travel Insurance","Lunch","Personal Expenses"] },
    { id: 5, name: "Maldives", country: "Maldives", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80", category: "beach", price: 3499, rating: 4.9, reviews: 1876, duration: "5 Days", badge: "Luxury", weather: { icon: "🌊", temp: "30°C", desc: "Hot & Tropical", bestSeason: "Nov – Apr" }, description: "Turquoise waters, private overwater villas, and pristine coral reefs. The ultimate tropical paradise.", itinerary: [{day:"Day 1",desc:"Arrival, speedboat transfer to resort, overwater villa check-in, sunset dolphin cruise."},{day:"Day 2",desc:"Snorkeling safari with manta rays, underwater restaurant lunch."},{day:"Day 3",desc:"Island hopping: village visit, sandbank picnic, bioluminescent beach."},{day:"Day 4",desc:"Deep-sea fishing, spa day, couples' sunset yoga."},{day:"Day 5",desc:"Leisure morning, private beach breakfast, departure."}], inclusions: ["Overwater Villa","Speedboat Transfer","Snorkeling Gear","Dolphin Cruise","Spa Session","Half Board"], exclusions: ["Flights","Travel Insurance","Alcohol","Diving Certification"] },
    { id: 6, name: "Swiss Alps, Switzerland", country: "Switzerland", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80", category: "mountain", price: 2899, rating: 4.7, reviews: 1534, duration: "7 Days", badge: "Adventure", weather: { icon: "🏔️", temp: "8°C", desc: "Cool & Alpine", bestSeason: "Jun – Sep" }, description: "Majestic snow-capped peaks, crystal-clear lakes, and charming alpine villages.", itinerary: [{day:"Day 1",desc:"Arrival in Zurich, scenic train to Interlaken, welcome dinner."},{day:"Day 2",desc:"Jungfraujoch — Top of Europe excursion, Ice Palace."},{day:"Day 3",desc:"Paragliding over Interlaken, Lake Thun boat cruise."},{day:"Day 4",desc:"Scenic train to Zermatt, Matterhorn cable car."},{day:"Day 5",desc:"Hiking: Five Lakes Trail, Swiss fondue evening."},{day:"Day 6",desc:"Glacier Express to St. Moritz, alpine village exploration."},{day:"Day 7",desc:"Morning lake walk, departure from Zurich."}], inclusions: ["Swiss Travel Pass","Mountain Hotels","Panoramic Trains","Paragliding","Cable Cars","Welcome Dinner"], exclusions: ["International Flights","Travel Insurance","Lunch","Personal Gear"] }
  ];
  originals.forEach(o => { result.push(o); seen.add(o.name); });

  const _catBadges = { beach:"Beach Escape", mountain:"Mountain Adventure", cultural:"Cultural Gem", romantic:"Romantic Getaway", luxury:"Luxury Escape", safari:"Safari Journey", adventure:"Adventure Trip", nature:"Nature Retreat" };
  const _catInclusions = { beach:["Airport Transfers","Beach Resort","Daily Breakfast","Snorkeling Gear","Boat Trip","Sunset Tour"], mountain:["Airport Transfer","Mountain Lodge","Breakfast Included","Guided Trek","Equipment Rental","Cable Car"], cultural:["Airport Transfers","Boutique Hotel","Daily Breakfast","Guided Tours","Museum Pass","Cooking Class"], romantic:["Airport Transfer","Cave Hotel","Breakfast & Dinner","Couples Spa","Sunset Cruise","Wine Tasting"], luxury:["Luxury Transfer","5-Star Resort","All Inclusive","Private Butler","Spa Credit","VIP Access"], safari:["Safari Lodge","Game Drives","Bush Dinner","Park Fees","Binoculars","Nature Guide"], adventure:["Airport Transfer","Adventure Lodge","Breakfast Included","Guide & Gear","Activity Fees","Safety Equipment"], nature:["Eco Lodge","Breakfast Included","Nature Guide","Trail Pass","Binoculars","Packed Lunch"] };
  const _catExclusions = ["International Flights","Travel Insurance","Personal Expenses","Meals Not Listed","Visa Fees","Tips & Gratuities"];

  let id = originals.length + 1;
  for (const p of _destPool) {
    if (seen.has(p.name)) continue;
    if (id > 120) break;
    seen.add(p.name);
    const cat = p.category;
    const price = _randInt(300, 3500);
    const duration = _randDuration(cat);
    const numDays = parseInt(duration) || 5;
    const itinPool = _itineraryPool[cat] || _itineraryPool.cultural;
    const itinDays = itinPool[id % itinPool.length];
    const itinerary = [];
    for (let i = 0; i < Math.min(numDays, itinDays.length); i++) {
      itinerary.push({ day: "Day " + (i+1), desc: itinDays[i] || "Free day to explore at your own pace." });
    }
    result.push({
      id,
      name: p.name,
      country: p.country,
      image: p.image,
      category: cat,
      price,
      rating: parseFloat(_randRating()),
      reviews: _randInt(120, 5200),
      duration,
      badge: _catBadges[cat] || "Popular",
      weather: p.weather,
      description: `Discover the magic of ${p.name.split(',')[0]} with our curated ${cat} experience. ${p.weather.desc} weather awaits you during the best season: ${p.weather.bestSeason}.`,
      itinerary,
      inclusions: _catInclusions[cat] || _catInclusions.cultural,
      exclusions: _catExclusions
    });
    id++;
  }
  return result;
}

const destinations = _generateDestinations();

/* ============================================
   DOM REFERENCES
   ============================================ */
const destGrid = document.getElementById('destGrid');
const filterTabs = document.getElementById('filterTabs');
const detailModal = document.getElementById('detailModal');
const bookingModal = document.getElementById('bookingModal');
const detailContent = document.getElementById('detailContent');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

/* ============================================
   PAGINATION STATE
   ============================================ */
const PAGE_SIZE = 12;
let currentPage = 1;
let filteredDestinations = [...destinations];
let currentSort = 'default';
let currentSearchQuery = '';

/* ============================================
   CURRENCY SYSTEM
   ============================================ */
const currencyRates = { USD: 1, INR: 83.12, EUR: 0.92 };
const currencySymbols = { USD: '$', INR: '₹', EUR: '€' };
let currentCurrency = localStorage.getItem('wanderlux_currency') || 'USD';

function formatPrice(usdAmount) {
  const converted = usdAmount * currencyRates[currentCurrency];
  const symbol = currencySymbols[currentCurrency];
  return symbol + converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatPriceHTML(usdAmount, tag) {
  return `<span class="price-display" data-usd="${usdAmount}">${formatPrice(usdAmount)}</span>${tag || ''}`;
}

function updateAllPrices() {
  document.querySelectorAll('.price-display').forEach(el => {
    const usd = parseFloat(el.dataset.usd);
    if (!isNaN(usd)) el.textContent = formatPrice(usd);
  });
  document.querySelectorAll('[data-usd]').forEach(el => {
    const usd = parseFloat(el.dataset.usd);
    if (!isNaN(usd)) el.textContent = formatPrice(usd);
  });
  updateBookingPrice();
}

/* ============================================
   THEME TOGGLE
   ============================================ */
function initTheme() {
  const saved = localStorage.getItem('wanderlux_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('wanderlux_theme', next);
}

/* ============================================
   CURRENCY SWITCHER
   ============================================ */
function initCurrency() {
  document.querySelectorAll('.currency-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === currentCurrency);
  });
  document.getElementById('currencySymbol').textContent = currencySymbols[currentCurrency];
}

function switchCurrency(code) {
  currentCurrency = code;
  localStorage.setItem('wanderlux_currency', code);
  document.querySelectorAll('.currency-option').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.currency === code);
  });
  document.getElementById('currencySymbol').textContent = currencySymbols[code];
  document.getElementById('currencySwitcher').classList.remove('open');
  updateAllPrices();
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFAQ() {
  document.getElementById('faqList').addEventListener('click', e => {
    const btn = e.target.closest('.faq-item__question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
}

/* ============================================
   WISHLIST SYSTEM
   ============================================ */
let wishlist = JSON.parse(localStorage.getItem('wanderlux_wishlist') || '[]');

function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from saved trips');
  } else {
    wishlist.push(id);
    showToast('Added to saved trips!');
  }
  localStorage.setItem('wanderlux_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderDestGrid();
}

function isInWishlist(id) {
  return wishlist.includes(id);
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadge');
  badge.textContent = wishlist.length;
  badge.classList.toggle('visible', wishlist.length > 0);
  renderWishlistDrawer();
}

function renderWishlistDrawer() {
  const items = document.getElementById('wishlistItems');
  const empty = document.getElementById('wishlistEmpty');
  if (wishlist.length === 0) {
    empty.style.display = 'flex';
    items.innerHTML = '';
    return;
  }
  empty.style.display = 'none';
  items.innerHTML = wishlist.map(id => {
    const d = destinations.find(x => x.id === id);
    if (!d) return '';
    return `
      <div class="wishlist-item" onclick="closeWishlist(); openDetailModal(${d.id})">
        <img src="${d.image}" alt="${d.name}" class="wishlist-item__img" loading="lazy" onerror="onImgError(this)" />
        <div class="wishlist-item__info">
          <div class="wishlist-item__name">${d.name}</div>
          <div class="wishlist-item__price">${formatPrice(d.price)}/person</div>
        </div>
        <button class="wishlist-item__remove" onclick="event.stopPropagation(); toggleWishlist(${d.id})" aria-label="Remove">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
  }).join('');
}

function openWishlist() {
  document.getElementById('wishlistDrawer').classList.add('open');
  document.getElementById('wishlistOverlay').classList.add('active');
}

function closeWishlist() {
  document.getElementById('wishlistDrawer').classList.remove('open');
  document.getElementById('wishlistOverlay').classList.remove('active');
}

/* ============================================
   COUPON / PROMO CODE SYSTEM
   ============================================ */
const couponCodes = {
  'EXPLORE20': { discount: 0.20, label: '20% OFF' },
  'TRAVEL10': { discount: 0.10, label: '10% OFF' },
  'WANDER15': { discount: 0.15, label: '15% OFF' },
  'ADVENTURE25': { discount: 0.25, label: '25% OFF' },
};
let appliedCoupon = null;

function applyCoupon() {
  const input = document.getElementById('bookCoupon');
  const feedback = document.getElementById('couponFeedback');
  const btn = document.getElementById('couponApplyBtn');
  const code = input.value.trim().toUpperCase();

  if (!code) {
    feedback.textContent = 'Please enter a promo code';
    feedback.className = 'coupon-feedback error';
    return;
  }

  if (couponCodes[code]) {
    appliedCoupon = { code, ...couponCodes[code] };
    feedback.textContent = `✓ ${appliedCoupon.label} applied!`;
    feedback.className = 'coupon-feedback success';
    btn.textContent = 'Applied';
    btn.classList.add('applied');
    input.disabled = true;
  } else {
    appliedCoupon = null;
    feedback.textContent = '✕ Invalid promo code';
    feedback.className = 'coupon-feedback error';
    btn.textContent = 'Apply';
    btn.classList.remove('applied');
  }
  updateBookingPrice();
}

function resetCoupon() {
  appliedCoupon = null;
  const input = document.getElementById('bookCoupon');
  const feedback = document.getElementById('couponFeedback');
  const btn = document.getElementById('couponApplyBtn');
  if (input) { input.value = ''; input.disabled = false; }
  if (feedback) { feedback.textContent = ''; feedback.className = 'coupon-feedback'; }
  if (btn) { btn.textContent = 'Apply'; btn.classList.remove('applied'); }
}

/* ============================================
   BUDGET CALCULATOR
   ============================================ */
const calcRates = {
  beach:      { hotel: { budget: 65, mid: 150, luxury: 400 }, activity: 55, food: 35, transport: 25 },
  mountain:   { hotel: { budget: 55, mid: 130, luxury: 350 }, activity: 70, food: 30, transport: 30 },
  cultural:   { hotel: { budget: 50, mid: 120, luxury: 320 }, activity: 45, food: 30, transport: 20 },
  romantic:   { hotel: { budget: 80, mid: 180, luxury: 450 }, activity: 50, food: 45, transport: 20 },
  luxury:     { hotel: { budget: 120, mid: 280, luxury: 600 }, activity: 80, food: 60, transport: 40 },
};
let calcHotelClass = 'budget';

function selectCalcHotel(el) {
  document.querySelectorAll('.calc-hotel').forEach(h => h.classList.remove('active'));
  el.classList.add('active');
  calcHotelClass = el.dataset.hotel;
  updateCalc();
}

function updateCalc() {
  const type = document.getElementById('calcType').value;
  const days = parseInt(document.getElementById('calcDays').value);
  document.getElementById('calcDaysVal').textContent = days;
  const rates = calcRates[type];
  const hotelCost = rates.hotel[calcHotelClass] * days;
  const activityCost = rates.activity * days;
  const foodCost = rates.food * days;
  const transportCost = rates.transport * days;
  const total = hotelCost + activityCost + foodCost + transportCost;
  document.getElementById('calcHotelCost').textContent = formatPrice(hotelCost);
  document.getElementById('calcActivityCost').textContent = formatPrice(activityCost);
  document.getElementById('calcFoodCost').textContent = formatPrice(foodCost);
  document.getElementById('calcTransportCost').textContent = formatPrice(transportCost);
  document.getElementById('calcTotal').textContent = formatPrice(total);
}

/* ============================================
   FILTER / SEARCH / SORT ENGINE
   ============================================ */
function getActiveCategory() {
  const active = document.querySelector('.filter-tab.active');
  return active ? active.dataset.filter : 'all';
}

function applyFiltersAndSort() {
  let results = [...destinations];
  const cat = getActiveCategory();
  const query = currentSearchQuery.toLowerCase().trim();

  // Category filter
  if (cat !== 'all') {
    results = results.filter(d => d.category === cat);
  }

  // Search filter
  if (query) {
    results = results.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.country.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      (d.badge && d.badge.toLowerCase().includes(query))
    );
  }

  // Budget filter from search bar
  const budgetVal = document.getElementById('searchBudget').value;
  if (budgetVal && budgetVal !== 'Any') {
    if (budgetVal.includes('Under')) {
      results = results.filter(d => d.price < 1000);
    } else if (budgetVal.includes('5000')) {
      results = results.filter(d => d.price >= 5000);
    } else {
      const nums = budgetVal.replace(/[^0-9–]/g, '').split('–').map(Number);
      if (nums.length === 2) {
        results = results.filter(d => d.price >= nums[0] && d.price <= nums[1]);
      }
    }
  }

  // Sort
  switch (currentSort) {
    case 'price-asc': results.sort((a, b) => a.price - b.price); break;
    case 'price-desc': results.sort((a, b) => b.price - a.price); break;
    case 'rating': results.sort((a, b) => b.rating - a.rating); break;
    case 'reviews': results.sort((a, b) => b.reviews - a.reviews); break;
    default: break;
  }

  filteredDestinations = results;
  currentPage = 1;
  renderDestGrid();
}

/* ============================================
   RENDER DESTINATION CARDS (Paginated)
   ============================================ */
function renderDestGrid() {
  const total = filteredDestinations.length;
  const visible = filteredDestinations.slice(0, currentPage * PAGE_SIZE);

  destGrid.innerHTML = visible.map(d => {
    const isSaved = isInWishlist(d.id);
    return `
    <div class="dest-card" data-category="${d.category}" onclick="openDetailModal(${d.id})">
      <div class="dest-card__img-wrap">
        <img src="${d.image}" alt="${d.name}" class="dest-card__img" loading="lazy" onerror="onImgError(this)" />
        <span class="dest-card__badge">${d.badge}</span>
        <button class="dest-card__favorite ${isSaved ? 'is-active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${d.id})" aria-label="Favorite">
          <svg viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="dest-card__body">
        <div class="dest-card__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${d.name}
        </div>
        <h3 class="dest-card__name">${d.name.split(',')[0]}</h3>
        <div class="dest-card__meta">
          <div class="dest-card__rating">
            ★ ${d.rating} <span>(${d.reviews.toLocaleString()})</span>
          </div>
          <div class="dest-card__price"><span class="price-display" data-usd="${d.price}">${formatPrice(d.price)}</span> <small>/person</small></div>
        </div>
      </div>
      <div class="dest-card__footer">
        <div class="dest-card__duration">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${d.duration}
        </div>
        <span class="dest-card__view">View Details →</span>
      </div>
    </div>`;
  }).join('');

  // Update count and Load More button
  updateResultsCount(visible.length, total);
  updateLoadMoreBtn(visible.length < total);
}

function updateResultsCount(shown, total) {
  let counter = document.getElementById('destCount');
  if (!counter) {
    counter = document.createElement('div');
    counter.id = 'destCount';
    counter.className = 'dest-count';
    const filterBar = document.querySelector('.filter-bar');
    filterBar.parentNode.insertBefore(counter, filterBar.nextSibling);
  }
  counter.textContent = `Showing ${shown} of ${total} destinations`;
}

function updateLoadMoreBtn(show) {
  let btn = document.getElementById('loadMoreBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'loadMoreBtn';
    btn.className = 'btn btn--primary load-more-btn';
    btn.onclick = loadMore;
    destGrid.parentNode.appendChild(btn);
  }
  btn.style.display = show ? 'inline-flex' : 'none';
  btn.textContent = 'Load More Destinations';
}

function loadMore() {
  currentPage++;
  renderDestGrid();
}

/* ============================================
   FILTER TABS
   ============================================ */
filterTabs.addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  applyFiltersAndSort();
});

/* ============================================
   DESTINATION DETAIL MODAL
   ============================================ */
function openDetailModal(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;
  detailContent.innerHTML = `
    <img src="${d.image}" alt="${d.name}" class="detail-banner" loading="lazy" onerror="onImgError(this)" />
    <div class="detail-body">
      <div class="detail-location">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${d.name}
      </div>
      <h2 class="detail-name">${d.name.split(',')[0]}</h2>
      <div class="detail-meta">
        <div class="detail-meta__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${d.duration}
        </div>
        <div class="detail-meta__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ★ ${d.rating} (${d.reviews.toLocaleString()} reviews)
        </div>
        <div class="detail-meta__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Max 12 guests
        </div>
      </div>
      <div class="detail-weather">
        <div class="detail-weather__icon">${d.weather.icon}</div>
        <div class="detail-weather__info">
          <div class="detail-weather__temp">${d.weather.temp}</div>
          <div class="detail-weather__desc">${d.weather.desc}</div>
        </div>
        <div class="detail-weather__season">Best: ${d.weather.bestSeason}</div>
      </div>
      <p class="detail-desc">${d.description}</p>
      <div class="detail-section">
        <h3 class="detail-section__title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Day-by-Day Itinerary
        </h3>
        <div class="itinerary-list">
          ${d.itinerary.map(i => `<div class="itinerary-item"><span class="itinerary-day">${i.day}</span><span class="itinerary-desc">${i.desc}</span></div>`).join('')}
        </div>
      </div>
      <div class="detail-section">
        <h3 class="detail-section__title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          What's Included
        </h3>
        <div class="incl-list">
          ${d.inclusions.map(i => `<span class="incl-tag">✓ ${i}</span>`).join('')}
          ${d.exclusions.map(i => `<span class="incl-tag incl-tag--excl">✕ ${i}</span>`).join('')}
        </div>
      </div>
      <div class="detail-cta">
        <div class="detail-cta__price"><span class="price-display" data-usd="${d.price}">${formatPrice(d.price)}</span> <small style="font-size:.85rem;color:var(--gray-500);font-weight:400">/person</small></div>
        <div class="detail-cta__actions">
          <button class="btn btn--outline btn--sm" onclick="downloadItinerary(${d.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
          <button class="btn btn--primary" onclick="closeDetailModal(); openBookingModal('${d.name.split(',')[0]}', ${d.price})">
            Book This Package
          </button>
        </div>
      </div>
    </div>
  `;
  detailModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  detailModal.classList.remove('active');
  document.body.style.overflow = '';
}

detailModal.addEventListener('click', e => {
  if (e.target === detailModal) closeDetailModal();
});

/* ============================================
   BOOKING MODAL
   ============================================ */
function openBookingModal(destName = '', price = 1499) {
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  resetCoupon();
  if (destName) {
    const pkgSelect = document.getElementById('bookPkg');
    for (const opt of pkgSelect.options) {
      if (opt.text.toLowerCase().includes(destName.toLowerCase())) {
        pkgSelect.value = opt.value;
        break;
      }
    }
  }
  updateBookingPrice();
}

function openBookingWithPkg(pkgName) {
  const pkgSelect = document.getElementById('bookPkg');
  for (const opt of pkgSelect.options) {
    if (opt.text.toLowerCase().includes(pkgName.toLowerCase().split(' ')[0])) {
      pkgSelect.value = opt.value;
      break;
    }
  }
  openBookingModal();
}

function closeBookingModal() {
  bookingModal.classList.remove('active');
  document.body.style.overflow = '';
}

bookingModal.addEventListener('click', e => {
  if (e.target === bookingModal) closeBookingModal();
});

function updateBookingPrice() {
  const guests = parseInt(document.getElementById('bookGuests').value) || 1;
  const price = parseInt(document.getElementById('bookPkg').value) || 0;
  const subtotal = guests * price;
  let total = subtotal;
  const discountEl = document.getElementById('bookingDiscount');
  if (appliedCoupon) {
    const savings = Math.round(subtotal * appliedCoupon.discount);
    total = subtotal - savings;
    discountEl.textContent = `${appliedCoupon.label} — You save ${formatPrice(savings)}`;
  } else {
    discountEl.textContent = '';
  }
  document.getElementById('bookingTotal').textContent = formatPrice(total);
}

function handleBooking(e) {
  e.preventDefault();
  const name = document.getElementById('bookName').value.trim();
  const email = document.getElementById('bookEmail').value.trim();
  const date = document.getElementById('bookDate').value;
  if (!name || !email || !date) {
    showToast('Please fill in all fields.', true);
    return false;
  }
  closeBookingModal();
  document.getElementById('bookingForm').reset();
  updateBookingPrice();
  showToast(`Thank you, ${name}! Your trip is booked for ${new Date(date + 'T00:00:00').toLocaleDateString()}. Confirmation sent to ${email}.`);
  return false;
}

/* ============================================
   MOBILE NAV TOGGLE
   ============================================ */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.querySelectorAll('.navbar__link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ============================================
   ACTIVE NAV ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.navbar__link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

/* ============================================
   TOAST
   ============================================ */
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toastText');
  text.textContent = msg;
  toast.style.background = isError ? 'var(--danger)' : 'var(--success)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ============================================
   CONTACT FORM
   ============================================ */
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  document.getElementById('contactForm').reset();
  showToast(`Thanks ${name}! We'll get back to you within 24 hours.`);
  return false;
}

/* ============================================
   NEWSLETTER
   ============================================ */
function handleNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  showToast('You\'re subscribed! Check your inbox for a welcome gift.');
  return false;
}

/* ============================================
   DOWNLOAD ITINERARY (Print)
   ============================================ */
function downloadItinerary(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;
  const printWin = window.open('', '_blank');
  printWin.document.write(`<!DOCTYPE html><html><head><title>${d.name} Itinerary - Wanderlux</title>
    <style>
      body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; color: #1e293b; line-height: 1.6; }
      h1 { font-size: 1.8rem; margin-bottom: .25rem; }
      h2 { font-size: 1.2rem; margin: 1.5rem 0 .5rem; padding-bottom: .25rem; border-bottom: 2px solid #0ea5e9; color: #0ea5e9; }
      .meta { display: flex; gap: 2rem; margin-bottom: 1.5rem; color: #64748b; font-size: .9rem; flex-wrap: wrap; }
      .row { display: flex; gap: 1rem; padding: .5rem 0; border-bottom: 1px solid #f1f5f9; }
      .row strong { min-width: 60px; color: #0ea5e9; }
      .incl { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .5rem; }
      .incl span { padding: .3rem .7rem; background: #f1f5f9; border-radius: 50px; font-size: .85rem; }
      .excl span { background: #fef2f2; color: #ef4444; }
      .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: .8rem; color: #94a3b8; text-align: center; }
      @media print { body { padding: 1rem; } }
    </style></head><body>
    <h1>${d.name.split(',')[0]}</h1>
    <p style="color:#64748b">${d.name}</p>
    <div class="meta">
      <span>Duration: ${d.duration}</span>
      <span>Rating: ★ ${d.rating}</span>
      <span>Price: ${formatPrice(d.price)}/person</span>
    </div>
    <p>${d.description}</p>
    <h2>Day-by-Day Itinerary</h2>
    ${d.itinerary.map(i => `<div class="row"><strong>${i.day}</strong><span>${i.desc}</span></div>`).join('')}
    <h2>What's Included</h2>
    <div class="incl">${d.inclusions.map(i => `<span>✓ ${i}</span>`).join('')}</div>
    <h2>Exclusions</h2>
    <div class="incl excl">${d.exclusions.map(i => `<span>✕ ${i}</span>`).join('')}</div>
    <div class="footer">Wanderlux Travel &mdash; wanderlux.com &mdash; Generated on ${new Date().toLocaleDateString()}</div>
    <script>window.onload = function(){ window.print(); }<\/script>
  </body></html>`);
  printWin.document.close();
}

/* ============================================
   SCROLL TO SECTION HELPER
   ============================================ */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ============================================
   KEYBOARD SUPPORT
   ============================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDetailModal();
    closeBookingModal();
    closeWishlist();
  }
});

/* ============================================
   INIT
   ============================================ */
initTheme();
initCurrency();
initFAQ();
applyFiltersAndSort();
updateWishlistUI();
updateCalc();

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Currency switcher toggle
document.getElementById('currencyBtn').addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('currencySwitcher').classList.toggle('open');
});
document.querySelectorAll('.currency-option').forEach(opt => {
  opt.addEventListener('click', () => switchCurrency(opt.dataset.currency));
});
document.addEventListener('click', () => {
  document.getElementById('currencySwitcher').classList.remove('open');
});

// Wishlist drawer
document.getElementById('wishlistToggle').addEventListener('click', openWishlist);
document.getElementById('wishlistClose').addEventListener('click', closeWishlist);
document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);

// Sort dropdown
document.getElementById('sortSelect').addEventListener('change', e => {
  currentSort = e.target.value;
  applyFiltersAndSort();
});

// Search input (debounced)
let searchTimer;
document.getElementById('searchInput').addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearchQuery = e.target.value;
    applyFiltersAndSort();
  }, 300);
});

// Budget filter triggers re-filter
document.getElementById('searchBudget').addEventListener('change', () => applyFiltersAndSort());
