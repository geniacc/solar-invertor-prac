import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Phone, Mail, MapPin } from 'lucide-react'

const ContactSidebar = ({ isMobile, officeLocations, faqItems }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Office Locations */}
      <Card>
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <CardTitle className={`flex items-center gap-2 ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            <MapPin className="h-5 w-5" />
            Our Locations
          </CardTitle>
        </CardHeader>
        <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
          {officeLocations.map((location, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
              <h4 className={`font-semibold text-purple-500 mb-1 ${
                isMobile ? 'text-sm' : 'text-base'
              }`}>{location.city}</h4>
              <p className={`text-muted-foreground mb-2 ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>{location.address}</p>
              <div className={`flex flex-col gap-1 ${
                isMobile ? 'text-xs' : 'text-xs'
              }`}>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{location.email}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader className={isMobile ? 'p-4' : 'p-6'}>
          <CardTitle className={isMobile ? 'text-lg' : 'text-xl'}>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className={`space-y-4 ${isMobile ? 'p-4 pt-0' : 'p-6 pt-0'}`}>
          {faqItems.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
              <h4 className={`font-medium mb-2 ${
                isMobile ? 'text-sm' : 'text-base'
              }`}>{faq.question}</h4>
              <p className={`text-muted-foreground ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}>{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ContactSidebar