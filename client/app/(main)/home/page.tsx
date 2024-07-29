import { featureCardList } from "@/lib/constants";
import { Featurecard } from "../_components/feature-card";
import { Header } from "../_components/header";




const HomePage = () => {
    return (
        <div className="bg-gray-50 h-full px-4 py-2">
            <Header />

            <div className="flex items-center gap-x-2 ">
                {featureCardList.map((item, index) => (
                        <Featurecard 
                            key={index}
                            image={item.image}
                            tagName={item.tagName}
                            tagDescription={item.tagDescription}
                        />
                ))}
            </div>
        </div>
    );
}
 
export default HomePage;