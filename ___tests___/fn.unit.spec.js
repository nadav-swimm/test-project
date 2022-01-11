import {initialState, storeMutations} from '@/store/form.js'

describe('Test Store mutations logic', () => {
    test('setShareByEmail', () => {
        storeMutations.setShareMethod(initialState,'bla')
        expect(initialState.shareMethod == 'bla').toBeTruthy();
    });
});