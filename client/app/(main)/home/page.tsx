import { Featurecard } from "../_components/feature-card";
import { Header } from "../_components/header";

const HomePage = () => {
    return (
        <div className="bg-gray-50 h-full px-4 py-2">
            <Header />

            <Featurecard />
        </div>
    );
}
 
export default HomePage;