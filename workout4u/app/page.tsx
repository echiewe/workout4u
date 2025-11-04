
export default function Home() {
    return (
        <div className="bg-[url(/workout4u/svgs/background.svg)] w-full h-screen bg-cover bg-top">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] bg-perfume/70 pixel-border flex flex-col items-center justify-around pb-5">
                    <h1 className="text-shadow-lg">WORKOUT4U</h1>
                    <section className="w-3/4 h-3/4 bg-perfume pixel-border">
                        form goes here
                        {promptResponse}
                    </section>
                </div>
            </div>
        </div>
    );
}