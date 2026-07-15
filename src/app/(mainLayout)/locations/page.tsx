
import { FaMapMarkerAlt, FaPhone, FaClock, FaDirections } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

export default function Page() {
    const hospital = {
        name: "Dhaka Central Hospital",
        address: "House 2, Road 5, Green Road, Dhanmondi, Dhaka 1205",
        phone: "+880 2-9660015",
        hours: "Open 24 Hours",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.197361819662!2d90.38025187604624!3d23.73900608923053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b60b457635%3A0xb363417bc84fb30c!2sDhaka%20Central%20Hospital%20Ltd.!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
        directionUrl: "https://www.google.com/maps/dir/?api=1&destination=Dhaka+Central+Hospital+Dhanmondi+Dhaka"
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Card className="w-full overflow-hidden shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground p-6">
                    <CardTitle className="text-2xl font-bold">{hospital.name}</CardTitle>
                    <p className="text-sm opacity-90">Hospital Location & Contact Info</p>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden border">
                        <iframe title="Google Map" src={hospital.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={20} />
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Address</h4>
                                    <p className="text-sm">{hospital.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaPhone className="text-primary mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Phone</h4>
                                    <p className="text-sm">{hospital.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FaClock className="text-primary mt-1 flex-shrink-0" size={18} />
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground">Emergency Hours</h4>
                                    <p className="text-sm font-medium text-emerald-600">{hospital.hours}</p>
                                </div>
                            </div>
                        </div>
                        <a   href={hospital.directionUrl}  target="_blank"  rel="noopener noreferrer"
                            className={`${buttonVariants({ variant: "default" })} w-full flex items-center justify-center gap-2`}>
                            <FaDirections size={16} />
                            Get Directions
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}