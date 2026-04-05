import { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CvSection from './components/CvSection';
import ProximityText from './components/ProximityText';
import datschaImg from './data/pics/12X12/Datscha-at-Freibad-20251129-0330.jpg';

const TRAIL_RADIUS = 80;
const TRAIL_STRENGTH = 0.65;

function App() {
  const [showVideo, setShowVideo] = useState(false);
  const [showAlbum, setShowAlbum] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      const prevData =
        canvas.width > 0 && canvas.height > 0
          ? ctx.getImageData(0, 0, canvas.width, canvas.height)
          : null;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.globalCompositeOperation = 'lighten';
      if (prevData) {
        ctx.putImageData(prevData, 0, 0);
      }
    }
    resize();

    function onMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, TRAIL_RADIUS);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${TRAIL_STRENGTH})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, TRAIL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="app">
      <div className="pattern"></div>
      <canvas ref={canvasRef} className="cursor-trail" />
      <Header />
      <main className="main">
        <div className="works-section">
          <h2 className="works-title"><ProximityText>Works</ProximityText></h2>
          <div className="video-row">
            <button
              className="video-btn"
              onClick={() => { setShowVideo(!showVideo); setShowAlbum(false); setShowPhoto(false); setShowBubble(false); }}
            >
              <ProximityText>I Remember House</ProximityText>
            </button>
            {showVideo && (
              <div className="video-player">
                <iframe
                  src="https://www.youtube.com/embed/63JrTOA2km0?autoplay=1"
                  title="I Remember House"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          <div className="audio-row">
            <button
              className="video-btn"
              onClick={() => { setShowPhoto(!showPhoto); setShowVideo(false); setShowAlbum(false); setShowBubble(false); }}
            >

              <ProximityText>12X12 CLU8</ProximityText>
            </button>
            {showPhoto && (
              <div className="image-player">
                <img src={datschaImg} alt="Datscha at Freibad" />
              </div>
            )}
          </div>
          <div className="audio-row">
            <button
              className="video-btn"
              onClick={() => { setShowAlbum(!showAlbum); setShowVideo(false); setShowPhoto(false); setShowBubble(false); }}
            >


              <ProximityText>Noise is an Ocean</ProximityText>
            </button>
            {showAlbum && (
              <div className="audio-player">
                <iframe
                  src="https://bandcamp.com/EmbeddedPlayer/album=3264033015/size=large/bgcol=ffffff/linkcol=000000/tracklist=true/transparent=true/"
                  title="Noise is an Ocean by Mischa Nikov"
                  seamless
                ></iframe>
              </div>
            )}
          </div>
          <div className="video-row">
            <button
              className="video-btn"
              onClick={() => { setShowBubble(!showBubble); setShowVideo(false); setShowAlbum(false); setShowPhoto(false); }}
            >
              <ProximityText>Bubble Gum Tattoos Girl</ProximityText>
            </button>
            {showBubble && (
              <div className="video-player">
                <iframe
                  src="https://www.youtube.com/embed/1eywk7JZR2c?autoplay=1"
                  title="Bubble Gum Tattoos Girl"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <CvSection />
      </main>
    </div>
  );
}

export default App;
