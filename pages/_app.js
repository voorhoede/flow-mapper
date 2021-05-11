import './index.css';
import { CanvasLayout } from '../components/canvas-layout';

const MyApp = ({ Component, pageProps }) => {
  // console.log(pageProps)
  return (
    <CanvasLayout canvasId={pageProps.params?.canvasId}>
      <Component {...pageProps} />
    </CanvasLayout>
  );
};

export default MyApp;
