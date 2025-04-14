import { ArrowRight } from "lucide-react";

const Extra = () => {
    return (
        <section className="border-primary border-2 rounded-lg text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Build Your Portfolio?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
              Join thousands of professionals who have already created stunning portfolios with our platform.
            </p>
            <button className="gap-2">
              <span className="flex justify-center items-center gap-2 hover:text-primary">Get Started for Free <ArrowRight size={16} /></span>
            </button>
          </div>
        </section>
    )
}

export default Extra;