import { Navigate, Route, Routes } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import EditorPage from './pages/EditorPage';
import StudioPage from './pages/StudioPage';
import CommunityPage from './pages/CommunityPage';

export default function App() {
  return (
    <Routes>
      {/* The studio is the platform now; the template catalog stays as a
          separate browsing tool at /templates. */}
      <Route path="/" element={<StudioPage />} />
      <Route path="/templates" element={<GalleryPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/:id" element={<CommunityPage />} />
      <Route path="/template/:id" element={<EditorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
