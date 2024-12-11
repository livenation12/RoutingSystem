import { usePage } from '@inertiajs/react'
import React from 'react'
import AdminLayout from './AdminLayout'
import ReceiverLayout from './ReceiverLayout'
import GuestLayout from './GuestLayout'
import DepartmentHeadLayout from './DepartmentHeadLayout'
import OfficeHeadLayout from './OfficeHeadLayout'

const layoutMap = {
    admin: AdminLayout,
    receiver: ReceiverLayout,
    deptHead: DepartmentHeadLayout,
    officeHead: OfficeHeadLayout
    // Add more roles here as needed
}

export default function Layout({ children, header }) {
    const [role] = usePage().props.auth.roles

    // Handle an unknown role (this can be useful for debugging or if roles change unexpectedly)
    if (!layoutMap[role]) {
        console.warn(`Unknown role: ${role}. Falling back to GuestLayout.`);
    }

    // Use the layout map or default to GuestLayout
    const LayoutComponent = layoutMap[role] || GuestLayout

    return <LayoutComponent header={header}>{children}</LayoutComponent>
}
