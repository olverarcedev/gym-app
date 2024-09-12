import { Session } from "next-auth";
const updateMember = async (session: Session, token: string) => {
    const result = await fetch('/api/member', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: session.user.id,
            fcmToken: token,
        }),
    });
}
export default updateMember;