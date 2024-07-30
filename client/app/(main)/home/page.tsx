"use client"

import { featureCardList } from "@/lib/constants";
import { Featurecard } from "../_components/feature-card";
import { Header } from "../_components/header";
import { ViewOptions } from "../_components/view-options";
import { Kanban } from "../_components/kanban";




const HomePage = () => {
    return (
        <div className="bg-gray-50 h-full px-4 py-2 space-y-4 relative">
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

            <ViewOptions />

            <div className="max-h-screen h-full bg-white overflow-x-scroll p-3 rounded-sm">
                <Kanban />
            </div>
        </div>
    );
}
 
export default HomePage;