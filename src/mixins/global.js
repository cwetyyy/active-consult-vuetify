export default {
    methods: {
        setLoggedUser(user) {
            localStorage.setItem('activeConsultAdmin', JSON.stringify(user))
            
        },
        removeLoggedUser() {
            const user = JSON.parse(localStorage.getItem('activeConsultAdmin'))
            if(user) {
                localStorage.removeItem('activeConsultAdmin')
                
            }
        },
        getLoggedUser() {
            const user = JSON.parse(localStorage.getItem('activeConsultAdmin'))
            if(user) {
                
                return user
            }
            return null
        },

        getMonth(date) {
            const month = date.split('-')[1]
            const year = date.split('-')[0]

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            return months[month - 1] + ' ' + year
        }
    }
}