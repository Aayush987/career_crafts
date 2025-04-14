import {features} from "./Data"

const Features = () => {
    return (
        <section className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">Why Choose PortfolioBuilder</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Everything you need to create a professional portfolio website without coding skills.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg border transform hover:rotate-3 transition-transform duration-200  p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
};

export default Features;