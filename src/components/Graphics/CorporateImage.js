const CorporateImage = () => {
  return (
    <div className="relative">
      <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Fondo */}
        <rect width="500" height="400" rx="20" fill="#1F2937"/>
        
        {/* Edificio corporativo */}
        <rect x="100" y="150" width="300" height="200" fill="#111827"/>
        <rect x="120" y="170" width="60" height="60" fill="#3B82F6"/>
        <rect x="200" y="170" width="60" height="60" fill="#3B82F6"/>
        <rect x="280" y="170" width="60" height="60" fill="#3B82F6"/>
        <rect x="120" y="250" width="60" height="100" fill="#3B82F6"/>
        <rect x="200" y="250" width="60" height="100" fill="#3B82F6"/>
        <rect x="280" y="250" width="60" height="100" fill="#3B82F6"/>
        
        {/* Personas */}
        <circle cx="150" cy="100" r="20" fill="#F59E0B"/>
        <circle cx="250" cy="100" r="20" fill="#10B981"/>
        <circle cx="350" cy="100" r="20" fill="#EF4444"/>
        
        {/* Líneas de conexión */}
        <path d="M150 120L150 150" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
        <path d="M250 120L250 150" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
        <path d="M350 120L350 150" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
        
        {/* Logo JEGALE */}
        <text x="250" y="50" textAnchor="middle" fill="#E5E7EB" fontFamily="Arial" fontSize="24" fontWeight="bold">JEGALE</text>
      </svg>
    </div>
  );
};

export default CorporateImage;