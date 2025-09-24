'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { CheckoutForm } from '@/components/checkout-form';

declare global {
	interface Window {
		ApplePaySession?: any;
		google?: {
			payments?: {
				api?: {
					PaymentsClient: any;
				};
			};
		};
	}
}

// TODO: Review ApplePay and GooglePay implementation

export default function CheckoutPage() {
	const [sameAsShipping, setSameAsShipping] = useState(true);
	const [canMakePayment, setCanMakePayment] = useState({
		applePay: false,
		googlePay: false,
	});

	const cartItems = [
		{
			id: 1,
			name: 'Premium Dog Food',
			image:
				'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
			price: 39.99,
			quantity: 2,
		},
		{
			id: 2,
			name: 'Comfortable Dog Bed',
			image:
				'https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
			price: 69.99,
			quantity: 1,
		},
		{
			id: 3,
			name: 'Interactive Dog Toy',
			image:
				'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
			price: 19.99,
			quantity: 3,
		},
	];

	const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const shipping = 5.99;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	useEffect(() => {
		const checkApplePay = () => {
			try {
				if (typeof window !== 'undefined' && window.ApplePaySession) {
					if (window.ApplePaySession.canMakePayments()) {
						setCanMakePayment((prev) => ({ ...prev, applePay: true }));
						console.log('[v0] Apple Pay is available');
					}
				}
			} catch (error) {
				console.log('[v0] Apple Pay check failed:', error);
			}
		};

		const checkGooglePay = () => {
			try {
				if (typeof window !== 'undefined' && window.google?.payments?.api) {
					const paymentsClient = new window.google.payments.api.PaymentsClient({
						environment: 'TEST', // Change to 'PRODUCTION' for live
					});

					paymentsClient
						.isReadyToPay({
							apiVersion: 2,
							apiVersionMinor: 0,
							allowedPaymentMethods: [
								{
									type: 'CARD',
									parameters: {
										allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
										allowedCardNetworks: ['MASTERCARD', 'VISA'],
									},
								},
							],
						})
						.then((response: any) => {
							if (response.result) {
								setCanMakePayment((prev) => ({ ...prev, googlePay: true }));
								console.log('[v0] Google Pay is available');
							}
						})
						.catch((error: any) => {
							console.log('[v0] Google Pay check failed:', error);
						});
				} else {
					setTimeout(checkGooglePay, 1000);
				}
			} catch (error) {
				console.log('[v0] Google Pay initialization failed:', error);
			}
		};

		checkApplePay();
		checkGooglePay();
	}, []);

	const handleApplePay = () => {
		if (!window.ApplePaySession) {
			console.log('[v0] Apple Pay not available');
			return;
		}

		const request = {
			countryCode: 'US',
			currencyCode: 'USD',
			supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
			merchantCapabilities: ['supports3DS'],
			total: {
				label: 'PetDo Pet Store',
				amount: total.toFixed(2),
			},
			lineItems: cartItems
				.map((item) => ({
					label: `${item.name} (x${item.quantity})`,
					amount: (item.price * item.quantity).toFixed(2),
				}))
				.concat([
					{ label: 'Shipping', amount: shipping.toFixed(2) },
					{ label: 'Tax', amount: tax.toFixed(2) },
				]),
		};

		const session = new window.ApplePaySession(3, request);

		session.onvalidatemerchant = (event: any) => {
			console.log('[v0] Apple Pay merchant validation needed for:', event.validationURL);
			// In production, validate with your server
			// For demo purposes, we'll simulate success
			session.completeMerchantValidation({});
		};

		session.onpaymentauthorized = (event: any) => {
			console.log('[v0] Apple Pay payment authorized:', event.payment);
			// Process payment with your payment processor
			session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
			// Redirect to success page
			window.location.href = '/checkout/success';
		};

		session.onerror = (event: any) => {
			console.log('[v0] Apple Pay error:', event);
		};

		session.begin();
	};

	const handleGooglePay = () => {
		if (!window.google?.payments?.api) {
			console.log('[v0] Google Pay not available');
			return;
		}

		const paymentsClient = new window.google.payments.api.PaymentsClient({
			environment: 'TEST', // Change to 'PRODUCTION' for live
		});

		const paymentDataRequest = {
			apiVersion: 2,
			apiVersionMinor: 0,
			allowedPaymentMethods: [
				{
					type: 'CARD',
					parameters: {
						allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
						allowedCardNetworks: ['MASTERCARD', 'VISA'],
					},
					tokenizationSpecification: {
						type: 'PAYMENT_GATEWAY',
						parameters: {
							gateway: 'example',
							gatewayMerchantId: 'exampleGatewayMerchantId',
						},
					},
				},
			],
			merchantInfo: {
				merchantId: '12345678901234567890',
				merchantName: 'PetDo Pet Store',
			},
			transactionInfo: {
				totalPriceStatus: 'FINAL',
				totalPriceLabel: 'Total',
				totalPrice: total.toFixed(2),
				currencyCode: 'USD',
				countryCode: 'US',
			},
		};

		paymentsClient
			.loadPaymentData(paymentDataRequest)
			.then((paymentData: any) => {
				console.log('[v0] Google Pay payment data:', paymentData);
				// Process payment with your payment processor
				// Redirect to success page
				window.location.href = '/checkout/success';
			})
			.catch((error: any) => {
				console.log('[v0] Google Pay error:', error);
			});
	};

	return (
		<div className='container px-4 py-8 md:px-6 md:py-12'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold mb-2'>Checkout</h1>
				<div className='flex items-center text-sm text-muted-foreground'>
					<Link
						href='/'
						className='hover:text-primary'
					>
						Home
					</Link>
					<span className='mx-2'>/</span>
					<Link
						href='/cart'
						className='hover:text-primary'
					>
						Cart
					</Link>
					<span className='mx-2'>/</span>
					<span>Checkout</span>
				</div>
			</div>

			<div className='grid md:grid-cols-3 gap-8'>
				<div className='md:col-span-2 space-y-8'>
					{(canMakePayment.applePay || canMakePayment.googlePay) && (
						<div className='bg-card rounded-lg border p-6'>
							<h2 className='text-xl font-semibold mb-4'>Express Checkout</h2>
							<p className='text-sm text-muted-foreground mb-4'>Pay securely with your preferred payment method</p>
							<div className='flex flex-col sm:flex-row gap-3'>
								{canMakePayment.applePay && (
									<Button
										onClick={handleApplePay}
										variant='outline'
										className='flex-1 h-12 bg-black text-white hover:bg-gray-800 border-black font-medium'
									>
										<span className='mr-2 text-lg'>🍎</span>
										Pay
									</Button>
								)}
								{canMakePayment.googlePay && (
									<Button
										onClick={handleGooglePay}
										variant='outline'
										className='flex-1 h-12 bg-white text-black hover:bg-gray-50 border-gray-300 font-medium'
									>
										<span className='text-blue-600 font-bold text-lg'>G</span>
										<span className='ml-1 text-gray-600'>Pay</span>
									</Button>
								)}
							</div>
							<div className='relative my-6'>
								<div className='absolute inset-0 flex items-center'>
									<span className='w-full border-t' />
								</div>
								<div className='relative flex justify-center text-xs uppercase'>
									<span className='bg-background px-2 text-muted-foreground'>Or continue with card</span>
								</div>
							</div>
						</div>
					)}

					{/* Shipping Information */}
					<div className='bg-card rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4'>Shipping Information</h2>
						<CheckoutForm key='shipping-form' />
					</div>

					{/* Billing Information */}
					<div className='bg-card rounded-lg border p-6'>
						<div className='flex items-center justify-between mb-4'>
							<h2 className='text-xl font-semibold'>Billing Information</h2>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='same-as-shipping'
									checked={sameAsShipping}
									onCheckedChange={(isChecked) => setSameAsShipping(isChecked === 'indeterminate' ? false : isChecked)}
								/>
								<Label
									htmlFor='same-as-shipping'
									className='text-sm font-normal'
								>
									Same as shipping address
								</Label>
							</div>
						</div>

						{!sameAsShipping && <CheckoutForm key='billing-form' />}
					</div>

					{/* Payment Method */}
					<div className='bg-card rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4'>Payment Method</h2>
						<RadioGroup defaultValue='credit-card'>
							<div className='flex items-center space-x-2 border rounded-md p-4 mb-3'>
								<RadioGroupItem
									value='credit-card'
									id='credit-card'
								/>
								<Label
									htmlFor='credit-card'
									className='flex items-center gap-2 cursor-pointer'
								>
									<span>💳</span>
									Credit Card
								</Label>
							</div>

							<div className='grid gap-4 pl-6'>
								<div className='space-y-2'>
									<Label htmlFor='card-number'>Card Number</Label>
									<Input
										id='card-number'
										placeholder='1234 5678 9012 3456'
									/>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='expiry'>Expiration Date</Label>
										<Input
											id='expiry'
											placeholder='MM/YY'
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='cvv'>CVV</Label>
										<Input
											id='cvv'
											placeholder='123'
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='name-on-card'>Name on Card</Label>
									<Input
										id='name-on-card'
										placeholder='John Doe'
									/>
								</div>
							</div>

							<div className='flex items-center space-x-2 border rounded-md p-4 mt-3'>
								<RadioGroupItem
									value='paypal'
									id='paypal'
								/>
								<Label
									htmlFor='paypal'
									className='cursor-pointer'
								>
									PayPal
								</Label>
							</div>
						</RadioGroup>
					</div>

					{/* Order Notes */}
					<div className='bg-card rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4'>Order Notes (Optional)</h2>
						<div className='space-y-2'>
							<Label htmlFor='notes'>Notes</Label>
							<Textarea
								id='notes'
								placeholder='Special instructions for delivery or any other information'
								className='min-h-[100px]'
							/>
						</div>
					</div>
				</div>

				{/* Order Summary */}
				<div>
					<div className='sticky top-20'>
						<Card>
							<CardContent className='p-6'>
								<h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

								<Accordion
									type='single'
									collapsible
									defaultValue='items'
								>
									<AccordionItem
										value='items'
										className='border-none'
									>
										<AccordionTrigger className='py-2'>{cartItems.length} items</AccordionTrigger>
										<AccordionContent>
											<div className='space-y-4'>
												{cartItems.map((item) => (
													<div
														key={item.id}
														className='flex gap-4'
													>
														<div className='relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0'>
															<Image
																src={item.image || '/placeholder.svg'}
																alt={item.name}
																fill
																className='object-cover'
															/>
															<div className='absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full'>
																{item.quantity}
															</div>
														</div>
														<div className='flex-1'>
															<h4 className='text-sm font-medium'>{item.name}</h4>
															<p className='text-sm text-muted-foreground'>
																${item.price.toFixed(2)} x {item.quantity}
															</p>
														</div>
														<div className='text-sm font-medium'>${(item.price * item.quantity).toFixed(2)}</div>
													</div>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								<Separator className='my-4' />

								<div className='space-y-4'>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Subtotal</span>
										<span>${subtotal.toFixed(2)}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Shipping</span>
										<span>${shipping.toFixed(2)}</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-muted-foreground'>Tax</span>
										<span>${tax.toFixed(2)}</span>
									</div>
									<Separator />
									<div className='flex items-center justify-between font-medium text-lg'>
										<span>Total</span>
										<span>${total.toFixed(2)}</span>
									</div>

									<div className='pt-4'>
										<Button
											className='w-full'
											size='lg'
											asChild
										>
											<Link href='/checkout/review'>Review Order</Link>
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
