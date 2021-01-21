<template>
    <div class="accounting-calendar">
        <v-container class="my-5">
            <v-row>
                <v-col cols="8">
                    <h2 v-if="$vuetify.breakpoint.mdAndUp" class="info--text">Accounting Calendar</h2>
                    <h4 v-if="$vuetify.breakpoint.smAndDown" class="info--text">Accounting Calendar</h4>
                </v-col>
                <v-col cols="4" class="text-right" v-if="!loading">
                    <v-btn depressed color="info" @click="addModal = !addModal">Add Event</v-btn>
                </v-col>
            </v-row>

            <v-row v-if="loading" class="my-5">
                <v-col cols="12" class="text-center">
                    <v-progress-circular
                        indeterminate
                        color="info"
                        size="40"
                    ></v-progress-circular>
                    <p class="mt-3 subtitle-2">Loading Events...</p>
                </v-col>
            </v-row>

            <v-row v-if="!loading && !events.length" class="my-5">
                <v-col cols="12" class="text-center">
                    <p class="mt-3 info--text">No Event Found</p>
                </v-col>
            </v-row>

            <v-tabs v-model="tab" color="info" class="mt-5" v-if="!loading && events.length">
                <v-tab>All Events</v-tab>
                <v-tab>Today</v-tab>
                <v-tab>This Week</v-tab>
                <v-tab>This Month</v-tab>
                <v-tab>Complete</v-tab>
                <v-tab>Uncomplete</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" v-if="!loading && events && events.length">
                <v-tab-item>
                    <AllEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
                <v-tab-item>
                    <TodayEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
                <v-tab-item>
                    <ThisWeekEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
                <v-tab-item>
                    <ThisMonthEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
                <v-tab-item>
                    <CompleteEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
                <v-tab-item>
                    <UncompleteEvents :headers="headers" :events="events" @updateStatus="updateStatus" />
                </v-tab-item>
            </v-tabs-items>
        </v-container>

        <v-dialog v-model="addModal" title="Add Event" max-width="500" :scrollable="false" persistent>
            <v-card>
                <v-card-title class="d-flex">
                    <h3 class="info--text">Add Event</h3>
                    <v-icon @click="addModal = !addModal" class="ml-auto">mdi-close</v-icon>
                </v-card-title>
                <v-card-text class="mt-4">
                    <v-divider></v-divider>
                    <v-row class="mt-4">
                        <v-col cols="12">
                            <v-text-field placeholder="Event Name" color="info" v-model="event.name" outlined hide-details></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="['Complete', 'Uncomplete']"  v-model="event.status" hide-details placeholder="Status" color="info" outlined></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="event.deadline_date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="event.deadline_date"
                                    placeholder="Deadline Date"
                                    prepend-inner-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    hide-details
                                    color="info"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="event.deadline_date"
                                    color="info"
                                    no-title
                                    scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menu.save(event.deadline_date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete :items="getUsers" v-model="event.user" return-object item-text="companyName" placeholder="Select User" color="info" outlined hide-details></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea placeholder="Description" v-model="event.description" color="info" outlined hide-details></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-btn block depressed color="info" @click="submitEvent" :disabled="createLoading">{{createLoading ? 'Adding Event...' : 'Add Event'}}</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import AllEvents from '@/components/AccountingCalendar/AllEvents'
import TodayEvents from '@/components/AccountingCalendar/TodayEvents'
import ThisWeekEvents from '@/components/AccountingCalendar/ThisWeekEvents'
import ThisMonthEvents from '@/components/AccountingCalendar/ThisMonthEvents'
import CompleteEvents from '@/components/AccountingCalendar/CompleteEvents'
import UncompleteEvents from '@/components/AccountingCalendar/UncompleteEvents'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "AccountingCalendar",
    computed: {
        ...mapGetters(["getUsers", "getEvents", "getToast"])
    },
    components: {
        AllEvents,
        TodayEvents,
        ThisWeekEvents,
        ThisMonthEvents,
        CompleteEvents,
        UncompleteEvents
    },
    created() {
        if(!this.getUsers.length) {
            this.fetchUsers()
        }
        if(!this.getEvents.length) {
            this.loading = true
            this.fetchEvents()
        }
        else {
            const user_id = this.$route.params.id
            this.events = this.getEvents.filter(event => event.user_id == user_id)
        }
    },
    watch: {
        getToast() {
            this.loading = false
            this.createLoading = false
        },
        getEvents(val) {
            if(val) {
                this.loading = false
                this.createLoading = false
                this.addModal = false
                const user_id = this.$route.params.id
                this.events = this.getEvents.filter(event => event.user_id == user_id)
            }
        }
    },
    data() {
        return {
            isStatusUpdating: false,
            loading: false,
            createLoading: false,
            selected: [],
            tab: null,
            menu: false,
            addModal: false,
            event: {
                name: null,
                deadline_date: null,
                status: null,
                user: null,
                isArchived: false,
                description: null,
            },
            headers: [
                { text: 'Event Name', sortable: true, value: 'name'},
                { text: 'Description', sortable: true, value: 'description'},
                { text: 'Status', value: 'status', sortable: true },
                { text: 'Assigned to', value: 'companyName', sortable: true },
                { text: 'Days Left', value: 'days_left', sortable: true },
                { text: 'Until', value: 'deadline_date', sortable: true },
            ],
            events: []
        }
    },
    methods: {
        ...mapActions(['fetchUsers', 'createEvent', 'fetchEvents', 'updateEventStatus']),
        async submitEvent() {
            let eventData = Object.assign({}, this.event)
            if(!eventData.user) {
                this.$store.commit('setToast', {message: "Please Select User.", color: 'red', show: true})
                return
            }
            if(!eventData.name || eventData.name == "") {
                this.$store.commit('setToast', {message: "Please Enter Event Name.", color: 'red', show: true})
                return
            }
            if(!eventData.deadline_date || eventData.deadline_date == "") {
                this.$store.commit('setToast', {message: "Please Select Deadline Date.", color: 'red', show: true})
                return
            }
            if(!eventData.status) {
                this.$store.commit('setToast', {message: "Please Select Status", color: 'red', show: true})
                return
            }
            if(!eventData.description) {
                this.$store.commit('setToast', {message: "Please Enter Description", color: 'red', show: true})
                return
            }
            eventData.companyName = eventData.user.companyName
            eventData.user_id = eventData.user.id
            delete eventData.user
            this.createLoading = true
            this.createEvent(eventData)
        },

        async updateStatus(value) {
            const status = value.status
            const selected_events = value.events
            Promise.all(
                selected_events.map(async doc => {
                    this.isStatusUpdating = true
                    doc.status = status
                    await this.updateEventStatus(doc)
                })
            )
        },
    },
}
</script>