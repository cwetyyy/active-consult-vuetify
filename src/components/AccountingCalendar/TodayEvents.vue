<template>
    <div class="today-events mt-5">
        
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    outlined
                    dense
                    class="cyan lighten-5"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="12" class="d-flex" v-if="selected.length">
                <!-- <v-btn color="info" text><v-icon>mdi-arrow-down</v-icon> Archive</v-btn> -->
                <v-btn color="info" text @click="updateStatus('Complete')">Mark as complete</v-btn>
                <v-btn color="info" text @click="updateStatus('Uncomplete')">Mark as uncomplete</v-btn>
            </v-col>
        </v-row>

        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="getTodayEvents"
            :search="search"
            :single-select="singleSelect"
            item-key="id"
            show-select
        >
            <template v-slot:top>
                
            </template>
            <template v-slot:item.days_left="{ item }">
                {{getDaysLeft(item.deadline_date)}}
            </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: "TodayEvents",
    props: {
        events: Array,
        headers: Array
    },
    computed: {
        getTodayEvents() {
            const today = moment().format('YYYY-MM-DD')
            const todayEvents = this.events.filter(e => e.deadline_date == today)
            return todayEvents
        }
    },
    data() {
        return {
            search: null,
            singleSelect: false,
            selected: [],
        }
    },

    methods: {
        getDaysLeft(date) {
            const currentDate = moment()
            const eventDate = moment(date)

            const diff = eventDate.diff(currentDate, 'days')
            if(diff >= 0) {
                return diff
            } 
            return "Expired";
        },
        updateStatus(status) {
            const payload = {
                status: status,
                events: this.selected
            }

            this.$emit('updateStatus', payload)
        }
    },
}
</script>