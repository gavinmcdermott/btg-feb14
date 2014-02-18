angular.module('sample', [])
.controller('MainCtrl', ['$scope', function() {

}])

.directive('mainStateManager', function($timeout) {
    return {
        restrict: 'A',
        controller: function($scope) {
            $scope.portfolioOpen = false;
        },
        link: function(scope, ele, attrs) {

            scope.isCurrent = function(arg) {
                return true;
            };

            var $main = $( '.secondary-container' ),
                $pages = $main.children( 'div.secondary-page' ),
                pagesCount = $pages.length,
                current = 0,
                isAnimating = false,
                endCurrPage = false,
                endNextPage = false,
                animEndEventNames = {
                    'WebkitAnimation' : 'webkitAnimationEnd',
                    'OAnimation' : 'oAnimationEnd',
                    'msAnimation' : 'MSAnimationEnd',
                    'animation' : 'animationend'
                },
                // animation end event name
                animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
                // support css animations
                support = Modernizr.cssanimations;

            var init = function() {
                $pages.each( function() {
                    var $page = $( this );
                    $page.data( 'originalClassList', $page.attr( 'class' ) );
                } );

                $pages.eq( current ).addClass( 'secondary-page-current' );
            };

            var animateScreen = function( type ) {
                if( isAnimating ) {
                    return false;
                }

                isAnimating = true;

                var $currPage = $pages.eq( current );

                if( current < pagesCount - 1 ) {
                    ++current;
                }
                else {
                    current = 0;
                }

                var $nextPage = $pages.eq( current ).addClass( 'secondary-page-current' ),
                    outClass = '', inClass = '';

                switch(type) {
                    case 1:
                        outClass = 'secondary-page-scaleDown';
                        inClass = 'secondary-page-moveFromRight secondary-page-ontop';
                        break;
                    case 2:
                        outClass = 'secondary-page-moveToRight secondary-page-ontop';
                        inClass = 'secondary-page-scaleUp';
                        break;
                }



                $currPage.addClass( outClass ).on( animEndEventName, function() {
                    $currPage.off( animEndEventName );
                    endCurrPage = true;
                    if( endNextPage ) {
                        onEndAnimation( $currPage, $nextPage );
                    }
                } );

                $nextPage.addClass( inClass ).on( animEndEventName, function() {
                    $nextPage.off( animEndEventName );
                    endNextPage = true;
                    if( endCurrPage ) {
                        onEndAnimation( $currPage, $nextPage );
                    }
                } );

                if( !support ) {
                    onEndAnimation( $currPage, $nextPage );
                }
            };

            function onEndAnimation( $outpage, $inpage ) {
                endCurrPage = false;
                endNextPage = false;
                resetPage( $outpage, $inpage );
                isAnimating = false;
            }

            function resetPage( $outpage, $inpage ) {
                $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
                $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' secondary-page-current' );
            }

            init();
            // setTimeout(function() {
            //     animateScreen(1);
                    // $('.left-nav-level.level-one').addClass('ln-pull-left');
                    // $('.left-nav-level.level-two').addClass('ln-pull-left');
            //     setTimeout(function() {
                    // animateScreen(2);
                    // $('.left-nav-level.level-one').addClass('ln-pull-right');
                    // $('.left-nav-level.level-two').addClass('ln-pull-right');
            //         setTimeout(function() {
            //             $('.moveright').addClass('moveleft');

            //             $('.move-main-first-up').addClass('move-main-first-down');

            //             $('.a').addClass('animated moveleft');
            //             $('.secondary-container').addClass('animated hide');
            //         }, 4000);
            //     }, 4000);
            // }, 4000);

            var portfolioOpen = false;
            var isMoving = false;
            scope.accountShowing = false;

            scope.portfolioOpen = false;

            $('#portfolio').click(function() {
                if (portfolioOpen) {
                    hidePortfolio();
                    portfolioOpen = false;
                } else {
                    showPortfolio();
                    portfolioOpen = true;
                }

            });

            var showPortfolio = function() {

                if (!isMoving) {
                    scope.portfolioOpen = true;
                    isMoving = true;
                    $('#portfolio').addClass('move-main-first-up');
                    // $('#portfolio').addClass('moveleft');
                    $('#market').addClass('moveright');
                    $('.secondary-container').addClass('show');

                    $timeout(function() {
                        isMoving = false;
                    }, 0);
                }
            };

            var hidePortfolio = function() {
                $timeout(function() {
                    if (!isMoving && !scope.accountShowing) {
                        scope.portfolioOpen = false;
                        console.log('HIDING!!!');
                        isMoving = true;
                        $('.move-main-first-up').toggleClass('move-main-first-down');
                        $('.moveright').toggleClass('moveleft');
                        $('.show').toggleClass('hide');

                        $timeout(function() {
                            isMoving = false;
                            $('.move-main-first-down').removeClass('move-main-first-down move-main-first-up');
                            $('.moveright').removeClass('moveleft moveright');
                            $('.show').removeClass('hide show');
                        }, 750);
                    }
                }, 0);

            };


            $('#account-tile-a').click(function() {
                showAccount();
            });

            var showAccount = function() {
                $timeout(function() {
                    if (!isMoving) {
                        isMoving = true;
                        scope.accountShowing = true;
                        animateScreen(1);
                        $('.left-nav-level.level-one').addClass('ln-pull-left');
                        $('.left-nav-level.level-two').addClass('ln-pull-left');

                        $timeout(function() {
                            isMoving = false;
                        }, 750);
                    }
                }, 0);
            };

            var hideAccount = function() {
                $timeout(function() {
                    if (!isMoving) {
                        scope.accountShowing = false;
                        isMoving = true;
                        animateScreen(2);
                        $('.ln-pull-left').toggleClass('ln-pull-right');
                        $timeout(function() {
                            $('.ln-pull-left').removeClass('ln-pull-left ln-pull-right');
                            isMoving = false;
                        }, 1000);
                    }
                }, 0);
            };

            $('.section-back').click(function() {
                if (scope.creatingAccount) {
                    $timeout(function() {
                        $('#wallet-list').addClass('hide');
                        $('.ln-pull-left').toggleClass('ln-pull-right');
                        scope.modMmenu = false;
                            $timeout(function() {
                                $('#wallet-list').removeClass('hide').addClass('show');
                                $('.ln-pull-left').removeClass('ln-pull-left ln-pull-right');
                                isMoving = false;
                                scope.creatingAccount = false;
                            }, 550);
                    }, 0);
                } else {
                    hideAccount();
                }
            });

            $('#section-close').click(function() {
                hidePortfolio();
            });

            scope.modMenu = false;

            $('#add-act').click(function() {
                $timeout(function() {
                    $('#wallet-list').addClass('hide');
                    scope.modMenu = true;
                    $timeout(function() {
                        scope.creatingAccount = true;
                        $('#wallet-list').removeClass('hide').addClass('show');
                    }, 550);
                    console.log('test');
                    $('.left-nav-level.level-one').addClass('ln-pull-left');
                    $('.left-nav-level.level-two').addClass('ln-pull-left');
                }, 0);

                // showAccount();
            });
        }
    };
})

.directive('accountCreator', function($timeout) {
    return {
        restrict: 'A',
        controller: function($scope) {

        },
        link: function(scope, ele, attrs) {
            scope.stuff = false;
            scope.walletname = "";
            scope.ppInfo = false;
            scope.securityScore = "Not Secure";

            $('.title-field').keyup(function() {
                if (this.value.length >= 3) {
                    scope.stuff = true;
                } else {
                    scope.stuff = false;
                }
                scope.$apply();
            });

            $('.title-field').blur(function() {
                if (this.value.length >= 3) {
                    $(this).css({'background-color': 'transparent'});
                }
                scope.$apply();
            });

            $('.title-field').focus(function() {
                $(this).css({'background-color': 'white'});
                scope.$apply();
            });

            $('.small-q').click(function() {
                scope.ppInfo = true;
                scope.$apply();
            });

            $('.pp').keyup(function() {
                if (this.value.length >= 3) {
                    scope.securityScore = "Secure";
                } else {
                    scope.securityScore = "Not Secure";
                }
                scope.$apply();
            });
        }
    };
});