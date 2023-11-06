import React from "react";
import AdminNav from "../../components/admin/AdminNav";
import AdminForm from "../../components/admin/AdminForm";
import "./AdminUser.scss"

const AdminUser = () => {
    return <div className="admin-user-layout">
        <AdminNav />
        <AdminForm />
    </div>
}

export default AdminUser;