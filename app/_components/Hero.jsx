import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-24 md:py-32">
            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Build Your Professional Portfolio <span className="text-primary">in Minutes</span>
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                    Showcase your work, attract clients, and advance your career with a stunning portfolio website that stands
                    out.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row space-x-2">
                    <Link href={'/create'} className="gap-2 hover:border-2 rounded-lg font-bold hover:border-violet-600 p-2 transition-all">
                        Create Your Portfolio 
                    </Link>
                    <Link className="hover:border-slate-600 hover:border-2 hover:p-2 hover:transition-all rounded-lg" href={'/showcase'}>
                        View Examples
                    </Link>
                </div>

                <div className="mt-16 rounded-lg border bg-card p-2 shadow-xl">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        {/* <iframe className="w-full h-full" src="https://lottie.host/embed/a10ea266-8593-439d-9f77-c49710508476/bvMan0PucE.lottie"></iframe> */}
                        <iframe className="w-full h-full" src="https://lottie.host/embed/c0d1de16-9af4-470d-baed-25ccc7dc74d3/OW7hYdXM78.lottie"></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;