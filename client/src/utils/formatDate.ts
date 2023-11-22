export function formatDate(date:string):string{
    return new Date(date).toLocaleString("en-In",{
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    })
}