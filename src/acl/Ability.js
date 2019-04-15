import { AbilityBuilder } from '@casl/ability'

var definePermissionsFor = (user) => {
    const { can, rules } = AbilityBuilder.extract()

    if (user.type === 'school') {
        can('manage', 'all')
    } else if (user.type === 'teacher') {
        can('manage', [ 'Classes', 'Students' ])
    } else if (user.type === 'student') {
        can('read', 'Subjects')
        can('read', 'Pre-Admission')
    }

    return rules
}

export default definePermissionsFor
