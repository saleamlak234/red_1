import { useState, useEffect, useRef } from 'react';

const DrivingLicense = () => {
  const [formData, setFormData] = useState({
    licenseNumber: 'BD122238',
    fullName: 'ብርሀኑ ቻሌ ተስፋ',
    gender: 'ወ',
    bloodType: 'B+',
    birthDate: '07/12/2019',
    nationality: 'ኢትዮጵያዊ',
    validFrom: '24/06/2017',
    validTo: '24/06/2019',
    zone: 'NS',
    wereda: 'ባህር ዳር',
    kebele: '10',
    phone: '927650335',
    level: 'ደረጃ 4'
  });

  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  
  const barcodeRef = useRef(null);
  const photoInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPhoto(result);
        setBackgroundImage(result);
        if (photoInputRef.current) {
          photoInputRef.current.style.display = 'none';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignature(e.target.result);
        if (signatureInputRef.current) {
          signatureInputRef.current.style.display = 'none';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (formData.licenseNumber && formData.licenseNumber.trim() !== '' && window.JsBarcode && barcodeRef.current) {
      window.JsBarcode(barcodeRef.current, formData.licenseNumber, {
        format: "CODE128",
        lineColor: "#000",
        width: 15,
        height: 100,
        displayValue: false,
      });
    }
  }, [formData.licenseNumber]);

  const adjustInputWidth = (value) => {
    const length = value ? value.length : 0;
    return Math.min(120, Math.max(28, length * 8 + 10));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container relative rounded-lg box-border p-2 outline-none" 
           style={{ width: '3.37in', height: '2.125in' }}>
        
        <div className="card relative border border-border-blue w-full overflow-hidden h-full">
          {/* Header */}
          <div className="card-header bg-card-blue flex w-full h-6 whitespace-nowrap">
            <img 
              src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=50&h=30" 
              alt="logo" 
              className="mix-blend-lighten w-8 h-5 my-1 mx-2 blur-xs" 
            />
            <div className="text text-white leading-3 w-full">
              <h4 className="text-xs font-abyssinica font-semibold blur-xs opacity-60 tracking-wide">
                የኢትዮጲያ የአሽከርካሪ ብቃት ማረጋገጫ ፈቃድ
              </h4>
              <div className="text-xs text-center font-black opacity-60 blur-xs font-arial">
                Ethiopian Driving License
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card-body relative pl-1 overflow-hidden w-full">
            {/* Background watermark */}
            <div 
              className="absolute left-1/5 w-36 h-full opacity-30 mix-blend-screen bg-center bg-no-repeat"
              style={{ 
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
                backgroundSize: '250px'
              }}
            />

            <form>
              {/* License Info */}
              <div className="form-1 flex justify-center items-center mb-1">
                <label className="mr-2 text-xs font-semibold font-arial">ሰጪ</label>
                <span className="text-xs font-semibold font-arial">አማራ/ባህር ዳር</span>
                <span className="text-xs font-medium font-abyssinica ml-5">መ.ፈ.ቁ/DL.N0</span>
                <input
                  type="text"
                  className="w-1/4 border-none outline-none ml-5 text-xs font-black border-b border-gray-800 font-abyssinica text-center bg-transparent"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                />
              </div>

              {/* Name and basic info */}
              <div className="form-2 flex items-center mb-1">
                <input
                  type="text"
                  className="w-2/5 border-none outline-none border-b border-black text-text-blue text-xs text-center font-semibold font-arial bg-transparent"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
                <label className="mx-2 text-xs font-bold">ፆታ</label>
                <input
                  type="text"
                  className="w-5 text-xs text-center outline-none border-none mr-1 border-b border-gray-600 font-semibold bg-transparent"
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                />
                <label className="text-xs font-bold mr-7">የደም ዓ . :</label>
                <input
                  type="text"
                  className="w-5 text-xs text-center font-medium underline decoration-1 bg-transparent border-none outline-none"
                  value={formData.bloodType}
                  onChange={(e) => handleInputChange('bloodType', e.target.value)}
                />
              </div>

              {/* Main info section */}
              <div className="info flex justify-center">
                <div className="field">
                  {/* Birth date and nationality */}
                  <div className="flex items-center mb-1">
                    <label className="mr-2 text-xs font-semibold font-serif">የልደት ቀን: </label>
                    <input
                      type="text"
                      className="w-1/3 text-xs border-none outline-none underline decoration-1 mb-1 font-tienne mr-2 bg-transparent"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-1/4 ml-1 text-xs font-medium text-center underline decoration-1 font-abyssinica bg-transparent border-none outline-none"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                  </div>

                  {/* Valid dates */}
                  <div className="date flex items-center font-tienne mb-1 justify-evenly">
                    <label className="text-xs font-semibold font-serif">የአገ. ጊዜ </label>
                    <span>:</span>
                    <input
                      type="text"
                      className="border-none text-xs font-extrabold w-16 font-tienne border-b border-gray-400 ml-2 pl-1 bg-transparent"
                      value={formData.validFrom}
                      onChange={(e) => handleInputChange('validFrom', e.target.value)}
                    />
                    <span className="mx-1">--</span>
                    <input
                      type="text"
                      className="border-none text-xs font-extrabold w-16 font-tienne border-b border-gray-400 pl-1 mr-2 bg-transparent"
                      value={formData.validTo}
                      onChange={(e) => handleInputChange('validTo', e.target.value)}
                    />
                  </div>

                  {/* Address */}
                  <div className="address flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold font-serif">ዞን:</label>
                    <input
                      type="text"
                      className="w-full text-left mr-1 font-serif px-6 font-medium bg-transparent border-none outline-none underline decoration-1"
                      value={formData.zone}
                      onChange={(e) => handleInputChange('zone', e.target.value)}
                    />
                    <label className="pl-5 text-xs font-black">ወረዳ:</label>
                    <input
                      type="text"
                      className="w-full font-semibold text-xs underline decoration-1 font-serif bg-transparent text-left border-none outline-none"
                      value={formData.wereda}
                      onChange={(e) => handleInputChange('wereda', e.target.value)}
                    />
                  </div>

                  {/* Local info */}
                  <div className="local inline-flex items-center mb-1">
                    <label className="text-xs font-black">ቀበሌ፡ </label>
                    <input
                      type="text"
                      className="mr-1 text-xs underline decoration-1 font-serif bg-transparent border-none outline-none text-center"
                      style={{ width: `${adjustInputWidth(formData.kebele)}px` }}
                      value={formData.kebele}
                      onChange={(e) => handleInputChange('kebele', e.target.value)}
                    />
                    <label className="text-xs font-semibold">ስልክ:</label>
                    <input
                      type="text"
                      className="w-1/4 bg-transparent text-xs font-arial underline decoration-1 font-tienne border-none outline-none"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  {/* Level */}
                  <div className="level">
                    <input
                      type="text"
                      className="text-center text-xs w-full border-none bg-inherit outline-none font-semibold text-level-blue ml-12"
                      value={formData.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                    />
                  </div>
                </div>

                {/* Photo */}
                <div className="preview">
                  <div 
                    className="mt-1 border border-black mr-1 w-20 h-20 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: photo ? `url(${photo})` : '' }}
                  />
                </div>
              </div>

              {/* Barcode and signature section */}
              <div className="scan h-5 flex justify-evenly items-center overflow-hidden mb-5">
                <svg ref={barcodeRef} className="w-44 h-full border-none outline-none mix-blend-multiply ml-2" />
                <label className="text-xs tracking-wide ml-2 font-semibold">የሰጪ ፊርማ</label>
                <div 
                  className="w-12 h-4/5 bg-cover bg-center bg-no-repeat bg-gray-300 ml-1 border-none outline-none mb-1 mix-blend-lighten"
                  style={{ backgroundImage: signature ? `url(${signature})` : '' }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Upload controls */}
      <div className="register mt-4 print-hidden">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handlePhotoUpload}
          className="mb-2 block"
          placeholder="ምስል አስገባ"
        />
        <input
          ref={signatureInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleSignatureUpload}
          className="mb-2 block"
          placeholder="ፊርማ አስገባ"
        />
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default DrivingLicense;