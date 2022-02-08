import './assets/sass/main.scss'
import Routes from './router/Router'
import 'antd/dist/antd.css'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import useCloseBrowser from "./hooks/useCloseBrowser";

function App() {
    useCloseBrowser()
    return (
        <div className="App">
            <Routes/>
        </div>
    );
}

export default App;
