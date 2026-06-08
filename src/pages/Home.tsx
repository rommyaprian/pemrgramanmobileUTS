import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
} from '@ionic/react';
import { useState } from 'react';
import SpinWheel from '../components/SpinWheel';
import './Home.css';

const Home: React.FC = () => {
  const [optionText, setOptionText] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showResultAlert, setShowResultAlert] = useState(false);

  const handleAddOption = () => {
    const trimmedOption = optionText.trim();

    if (!trimmedOption) return;

    setOptions((prevOptions) => [...prevOptions, trimmedOption]);
    setOptionText('');
  };

  const handleDeleteOption = (indexToDelete: number) => {
    const updatedOptions = options.filter((_, index) => index !== indexToDelete);

    setOptions(updatedOptions);

    if (updatedOptions.length === 0) {
      setSelectedOption('');
      setRotationDeg(0);
      setIsSpinning(false);
      setShowResultAlert(false);
      return;
    }

    if (!updatedOptions.includes(selectedOption)) {
      setSelectedOption('');
      setShowResultAlert(false);
    }
  };

  const handleResetOptions = () => {
    setOptions([]);
    setOptionText('');
    setSelectedOption('');
    setRotationDeg(0);
    setIsSpinning(false);
    setShowResultAlert(false);
  };

  const handleSpin = () => {
    if (options.length === 0 || isSpinning) return;

    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];

    const segmentAngle = 360 / options.length;
    const targetRotation = 360 - randomIndex * segmentAngle;
    const normalizedTargetRotation =
      ((targetRotation % 360) + 360) % 360;

    setIsSpinning(true);
    setSelectedOption('');
    setShowResultAlert(false);

    setRotationDeg((prevRotation) => {
      const currentRotation = ((prevRotation % 360) + 360) % 360;
      const deltaRotation =
        (normalizedTargetRotation - currentRotation + 360) % 360;

      return prevRotation + 360 * 5 + deltaRotation;
    });

    setTimeout(() => {
      setSelectedOption(randomOption);
      setIsSpinning(false);
      setShowResultAlert(true);
    }, 3800);
  };

  return (
    <IonPage>
<IonHeader translucent className="fancy-header">
  <IonToolbar className="app-toolbar">
    <IonTitle className="app-title">Usrisan</IonTitle>
  </IonToolbar>
</IonHeader>

      <IonContent fullscreen className="home-content">
        <div className="page-wrapper">
          <IonCard className="hero-card">
            <IonCardContent>

              <IonText>
                <h1 className="main-title">Putar Roda, Tentukan Pilihan</h1>
              </IonText>

              <IonText color="medium">
                <p className="subtitle">
                  Tambahkan beberapa opsi, putar wheel, lalu biarkan aplikasi
                  memilih satu jawaban untuk Anda.
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          <IonCard className="input-card">
            <IonCardContent>
              <div className="section-header stacked">
                <IonText>
                  <h2 className="section-title">Tambah Pilihan</h2>
                </IonText>

                <div className="count-badge">
                  Total pilihan: <strong>{options.length}</strong>
                </div>
              </div>

              <IonInput
                label="Nama pilihan"
                labelPlacement="stacked"
                fill="outline"
                placeholder="Contoh: Nasi Goreng"
                value={optionText}
                onIonInput={(e) => setOptionText(e.detail.value ?? '')}
                className="custom-input"
              />

              <IonButton
                expand="block"
                className="add-button"
                disabled={!optionText.trim()}
                onClick={handleAddOption}
              >
                Tambah Pilihan
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonCard className="list-card">
            <IonCardContent>
              <div className="section-header">
                <IonText>
                  <h2 className="section-title">Daftar Pilihan</h2>
                </IonText>

                <IonButton
                  size="small"
                  color="danger"
                  fill="outline"
                  onClick={handleResetOptions}
                  disabled={options.length === 0 || isSpinning}
                >
                  Reset Semua
                </IonButton>
              </div>

              {options.length === 0 ? (
                <div className="empty-box">
                  <IonText color="medium">
                    <p className="empty-text">
                      Belum ada pilihan. Tambahkan dulu minimal satu item.
                    </p>
                  </IonText>
                </div>
              ) : (
                <IonList lines="none" className="options-list">
                  {options.map((option, index) => (
                    <IonItem key={index} className="option-item">
                      <IonLabel>
                        <div className="option-label">
                          <span className="option-number">{index + 1}</span>
                          <span className="option-name">{option}</span>
                        </div>
                      </IonLabel>

                      <IonButton
                        slot="end"
                        size="small"
                        color="danger"
                        fill="clear"
                        onClick={() => handleDeleteOption(index)}
                        disabled={isSpinning}
                      >
                        Hapus
                      </IonButton>
                    </IonItem>
                  ))}
                </IonList>
              )}
            </IonCardContent>
          </IonCard>

          <IonCard className="wheel-card">
            <IonCardContent>
              <IonText>
                <h2 className="section-title">Spin Wheel</h2>
              </IonText>

              <SpinWheel options={options} rotationDeg={rotationDeg} />

              <IonButton
                expand="block"
                className="spin-button"
                onClick={handleSpin}
                disabled={options.length === 0 || isSpinning}
              >
                {isSpinning ? 'Sedang Memutar...' : 'Spin Sekarang'}
              </IonButton>

              <div className={`result-box ${selectedOption ? 'has-result' : ''}`}>
                <IonText color="dark">
                  <p className="result-label">Hasil Lucky Spin</p>
                  <p className="result-text">
                    {selectedOption || 'Belum ada hasil spin.'}
                  </p>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <IonModal
  isOpen={showResultAlert}
  onDidDismiss={() => setShowResultAlert(false)}
  className="result-modal"
>
  <div className="result-modal-card">
    <div className="result-modal-badge">Lucky Result</div>

    <h2 className="result-modal-title">Usrisan</h2>

    <p className="result-modal-subtitle">Pilihan yang terpilih</p>

    <div className="result-modal-value">
      {selectedOption || '-'}
    </div>

    <IonButton
      expand="block"
      className="result-modal-button"
      onClick={() => setShowResultAlert(false)}
    >
      Tutup
    </IonButton>
  </div>
</IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;