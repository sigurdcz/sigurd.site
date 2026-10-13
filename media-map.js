/** Projektove fotografie: hlavni nahled a snimky v detailu. */
const mediaSet = (folder, count) => ({
  cover: `assets/screenshots/${folder}/hlavni.jpg`,
  gallery: Array.from({length: count}, (_, index) =>
    `assets/screenshots/${folder}/galerie/${String(index + 1).padStart(2, '0')}.jpg`
  )
});

window.NEURAL_MEDIA = {
  rbvideos: mediaSet('rb-videos-photos-svatebni-web', 4),
  darkmasterweb: mediaSet('dark-master-web', 4),
  sigurdsite: mediaSet('sigurd-site-portfolio', 2),
  taura: mediaSet('taura-vill', 2),
  ced: mediaSet('ced-voice-memory', 4),
  cedai: mediaSet('ced-voice-memory', 4),
  eleven: mediaSet('elevenlabs-game-audio-studio', 3),
  aieleven: mediaSet('elevenlabs-game-audio-studio', 3),
  localvoiceai: mediaSet('localvoiceai-worker', 2)
};
