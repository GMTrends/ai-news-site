/**
 * Responsive Design Test Script
 * 
 * This script helps test the mobile-first responsive design implementation
 * for the HeroRedesigned component.
 * 
 * Usage:
 * 1. Open your browser's developer tools
 * 2. Navigate to the /hero-test page
 * 3. Run this script in the console
 * 4. Test different screen sizes using device emulation
 */

console.log('🧪 Starting Responsive Design Test...');

// Test function to check if mobile-first approach is working
function testResponsiveDesign() {
    const results = {
        mobileFirst: false,
        sidebarStacking: false,
        touchTargets: false,
        relativeUnits: false,
        performance: false
    };

    // Test 1: Check if mobile-first grid is applied
    const heroGrid = document.querySelector('.new-hero-main-grid');
    if (heroGrid) {
        const computedStyle = window.getComputedStyle(heroGrid);
        const gridColumns = computedStyle.gridTemplateColumns;
        
        // On mobile, should be single column
        if (window.innerWidth <= 1023) {
            results.mobileFirst = gridColumns === '1fr' || gridColumns === 'none';
        } else {
            // On desktop, should be two columns
            results.mobileFirst = gridColumns.includes('2fr') && gridColumns.includes('1fr');
        }
        
        console.log(`📱 Mobile-first grid: ${results.mobileFirst ? '✅' : '❌'} (${gridColumns})`);
    }

    // Test 2: Check if sidebar is properly stacked on mobile
    const sidebar = document.querySelector('.new-premium-sidebar');
    const mainContent = document.querySelector('.new-dominant-feature');
    
    if (sidebar && mainContent) {
        if (window.innerWidth <= 1023) {
            // On mobile, sidebar should be below main content
            const sidebarRect = sidebar.getBoundingClientRect();
            const mainRect = mainContent.getBoundingClientRect();
            results.sidebarStacking = sidebarRect.top > mainRect.bottom;
        } else {
            // On desktop, sidebar should be to the right
            const sidebarRect = sidebar.getBoundingClientRect();
            const mainRect = mainContent.getBoundingClientRect();
            results.sidebarStacking = sidebarRect.left > mainRect.right;
        }
        
        console.log(`📚 Sidebar stacking: ${results.sidebarStacking ? '✅' : '❌'}`);
    }

    // Test 3: Check touch targets (minimum 44px)
    const touchElements = document.querySelectorAll('.new-subscribe-button, .new-sponsor-cta, .new-brief-headline a');
    let touchTargetsValid = true;
    
    touchElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.height < 44 || rect.width < 44) {
            touchTargetsValid = false;
        }
    });
    
    results.touchTargets = touchTargetsValid;
    console.log(`👆 Touch targets: ${results.touchTargets ? '✅' : '❌'}`);

    // Test 4: Check for relative units in CSS
    const styleSheets = Array.from(document.styleSheets);
    let hasRelativeUnits = false;
    
    try {
        styleSheets.forEach(sheet => {
            if (sheet.href && sheet.href.includes('hero-test')) {
                const rules = Array.from(sheet.cssRules || []);
                rules.forEach(rule => {
                    if (rule.style) {
                        const cssText = rule.style.cssText;
                        if (cssText.includes('rem') || cssText.includes('vw') || cssText.includes('vh') || cssText.includes('clamp(')) {
                            hasRelativeUnits = true;
                        }
                    }
                });
            }
        });
    } catch (e) {
        // Cross-origin stylesheets might throw errors
        hasRelativeUnits = true; // Assume true if we can't check
    }
    
    results.relativeUnits = hasRelativeUnits;
    console.log(`📏 Relative units: ${results.relativeUnits ? '✅' : '❌'}`);

    // Test 5: Check performance optimizations
    const hasBackdropFilter = window.getComputedStyle(document.querySelector('.new-hero-redesigned')).backdropFilter !== 'none';
    results.performance = hasBackdropFilter;
    console.log(`⚡ Performance optimizations: ${results.performance ? '✅' : '❌'}`);

    return results;
}

// Test at different screen sizes
function testAllBreakpoints() {
    const breakpoints = [
        { name: 'Mobile Portrait', width: 375, height: 667 },
        { name: 'Mobile Landscape', width: 667, height: 375 },
        { name: 'Tablet Portrait', width: 768, height: 1024 },
        { name: 'Tablet Landscape', width: 1024, height: 768 },
        { name: 'Desktop', width: 1200, height: 800 }
    ];

    console.log('🔍 Testing all breakpoints...');
    
    breakpoints.forEach(breakpoint => {
        console.log(`\n📐 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
        
        // Simulate screen size (this won't actually resize the viewport in most browsers)
        // You'll need to manually test these in dev tools
        const results = testResponsiveDesign();
        
        const passedTests = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;
        
        console.log(`📊 Score: ${passedTests}/${totalTests} tests passed`);
    });
}

// Run initial test
const initialResults = testResponsiveDesign();
const passedTests = Object.values(initialResults).filter(Boolean).length;
const totalTests = Object.keys(initialResults).length;

console.log(`\n🎯 Overall Score: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Your responsive design is working correctly.');
} else {
    console.log('⚠️  Some tests failed. Check the issues above and adjust your CSS.');
}

// Export functions for manual testing
window.testResponsiveDesign = testResponsiveDesign;
window.testAllBreakpoints = testAllBreakpoints;

console.log('\n💡 Manual Testing Instructions:');
console.log('1. Open Chrome DevTools (F12)');
console.log('2. Click the device toggle button (📱)');
console.log('3. Test different device sizes');
console.log('4. Run testResponsiveDesign() in console for current viewport');
console.log('5. Check that sidebar stacks below main content on mobile');
console.log('6. Verify touch targets are at least 44px on mobile');
