import Header from '@/components/header'
import { Slot } from 'expo-router'

export default function HomeLayout() {
    return (
        <>
            <Header />
            <Slot />
        </>
    )
}