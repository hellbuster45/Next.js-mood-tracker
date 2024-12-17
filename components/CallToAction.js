'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {
    const { currentUser } = useAuth()

    if(currentUser) {
        return (
            <div className = {'flex flex-row max-w-[600px] mx-auto w-full justify-center '}>
                <Link href = {'/dashboard'}>
                    <Button text = "Go to Dashboard -> " dark />
                </Link>
            </div>
        )
    }

    return (
    <div>
        <div className = {'flex flex-row justify-evenly  gap-4 '}>
            <Link href = {'/dashboard'}>
                <Button text = "Sign Up" />
            </Link>

            <Link href = {'/dashboard'}>
                <Button text = "Login" dark/>
            </Link>
        </div>
    </div>
    )
}
