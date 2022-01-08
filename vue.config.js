module.exports = {
    pwa: {
        name: 'IPv4 Subnet Calculator',
        themeColor: '#16000B',
        manifestOptions: {
            name: 'IPv4 Subnet Calculator',
            short_name: 'IPv4 SC'
        },
        iconPaths: {
            appleTouchIcon: 'img/icons/icon-152x152.png',
            msTileImage: 'img/icons/icon-144x144.png'
        }
    },
    pluginOptions: {
        electronBuilder: {
          builderOptions: {
            win: {
              icon: './icon.ico'
            }
          }
        }
      }
}