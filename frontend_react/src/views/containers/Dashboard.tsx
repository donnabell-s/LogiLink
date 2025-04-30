import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readAccessToken } from "../../services/authService";
import * as Components from "../components";

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAccessToken = async () => {
            const token = await readAccessToken();
            if (!token) {
                navigate("/login"); // Redirect to login if not authenticated
            }
        };
        checkAccessToken();
    }, [navigate]);

    return (
        <Components.Layout.Layout backgroundColor="#F6F7F9">
            <div>
                <Components.Feature.Dashboard />
            </div>
        </Components.Layout.Layout>
    );
}