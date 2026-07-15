import React from 'react'
import { FaHeart, FaHandHoldingHeart } from 'react-icons/fa'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
    async function handleDonate(formData: FormData) {
        'use server'
        const amount = formData.get('amount')
        console.log(`Donation amount: ${amount}`)
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <Card className="w-full shadow-lg border-red-100">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto bg-red-50 p-3 rounded-full w-fit">
                        <FaHeart className="text-red-500 animate-pulse" size={32} />
                    </div>
                    <CardTitle className="text-2xl font-bold">Support Our Cause</CardTitle>
                    <CardDescription>
                        Your contribution helps us provide healthcare services to those in need.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleDonate} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                                Donation Amount (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">$</span>
                                <Input 
                                    type="number" 
                                    name="amount" 
                                    placeholder="20" 
                                    className="pl-8"
                                    min="1"
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`${buttonVariants({ variant: "default" })} w-full flex items-center justify-center gap-2`}
                        >
                            <FaHandHoldingHeart size={18} />
                            Donate Now
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}