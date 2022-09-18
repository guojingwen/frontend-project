module.exports = {
    plugins: [
        require('cssnano')({
            preset: [
                'default',
                {
                    cssDeclarationSorter: false,
                    discardDuplicates: true,
                    discardOverridden: true,
                    discardComments: true,
                    discardUnused: true,
                    mergeIdents: true,
                    mergeLonghand: false,
                    discardUnused: true,
                }
            ]
        })
    ]
}