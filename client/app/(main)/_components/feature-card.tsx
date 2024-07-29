import Image from "next/image"


interface FeaturecardProps {
    image: string,
    tagName: string,
    tagDescription: string
}


export const Featurecard = ({
    image,
    tagName,
    tagDescription
}: FeaturecardProps) => {
    return (
        <div className="px-2 py-4 flex items-center gap-x-1 md:gap-x-2 lg:gap-x-4 bg-white rounded-sm max-h-32 relative w-full">
            <Image 
                src={image}
                alt="opinion"
                width={65}
                height={65}
                className="w-10 h-10 lg:w-16 lg:h-16"
            />
            <div className="text-gray-600 space-y-1 overflow-hidden">
                <p className="text-[10px] md:text-sm font-semibold absolute top-1/2 -translate-y-1/2 lg:relative lg:top-auto lg:translate-y-0">{tagName}</p>
                <p className="text-xs xl:text-sm  text-gray-500 hidden lg:block text-clip">{tagDescription}</p>
            </div>
        </div>
    )
}