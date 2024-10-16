import { defineStore } from 'pinia';
import { sesionState } from '@/models/sesionState';

export const useSesionStore = defineStore('sesion', {
    state: () => ({
        session: {
            loading: false,
            data: null,
        } as sesionState,
    }),
    actions: {
        update(session: sesionState) {
            this.session = session;
        },
    },
});
