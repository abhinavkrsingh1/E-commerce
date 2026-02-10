import React from 'react'
import { ShieldCheck, Truck, Headphones } from 'lucide-react'

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Secure Payment',
    description: 'Encrypted transactions via trusted gateways.',
    color: 'from-violet-500/20 to-purple-500/20',
    iconBg: 'bg-violet-100 text-violet-600',
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Free Delivery',
    description: 'Free shipping on all orders, no minimum.',
    color: 'from-sky-500/20 to-blue-500/20',
    iconBg: 'bg-sky-100 text-sky-600',
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: '24/7 Support',
    description: 'Round-the-clock help whenever you need it.',
    color: 'from-emerald-500/20 to-green-500/20',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
]

const Features = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group flex items-center gap-4 p-4 bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 cursor-default`}
            >
              <div className={`shrink-0 p-2.5 rounded-lg ${feature.iconBg} shadow-sm group-hover:shadow-md transition-shadow`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold mb-0.5">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features