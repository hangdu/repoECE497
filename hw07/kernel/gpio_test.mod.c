#include <linux/module.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

MODULE_INFO(vermagic, VERMAGIC_STRING);

__visible struct module __this_module
__attribute__((section(".gnu.linkonce.this_module"))) = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

static const struct modversion_info ____versions[]
__used
__attribute__((section("__versions"))) = {
	{ 0x55e6e9ad, __VMLINUX_SYMBOL_STR(module_layout) },
	{ 0xfe990052, __VMLINUX_SYMBOL_STR(gpio_free) },
	{ 0xf20dabd8, __VMLINUX_SYMBOL_STR(free_irq) },
	{ 0x9dde1f7c, __VMLINUX_SYMBOL_STR(gpiod_unexport) },
	{ 0xd6b8e852, __VMLINUX_SYMBOL_STR(request_threaded_irq) },
	{ 0xd753c0a2, __VMLINUX_SYMBOL_STR(gpiod_to_irq) },
	{ 0x97948914, __VMLINUX_SYMBOL_STR(gpiod_set_debounce) },
	{ 0xe074b24a, __VMLINUX_SYMBOL_STR(gpiod_direction_input) },
	{ 0x8f0a3023, __VMLINUX_SYMBOL_STR(gpiod_export) },
	{ 0xc303549a, __VMLINUX_SYMBOL_STR(gpiod_direction_output_raw) },
	{ 0x47229b5c, __VMLINUX_SYMBOL_STR(gpio_request) },
	{ 0xefd6cf06, __VMLINUX_SYMBOL_STR(__aeabi_unwind_cpp_pr0) },
	{ 0x27e1a049, __VMLINUX_SYMBOL_STR(printk) },
	{ 0x1e25abb2, __VMLINUX_SYMBOL_STR(gpiod_get_raw_value) },
	{ 0xc23e3bd1, __VMLINUX_SYMBOL_STR(gpiod_set_raw_value) },
	{ 0xcd9f9e7d, __VMLINUX_SYMBOL_STR(gpio_to_desc) },
	{ 0xb1ad28e0, __VMLINUX_SYMBOL_STR(__gnu_mcount_nc) },
};

static const char __module_depends[]
__used
__attribute__((section(".modinfo"))) =
"depends=";


MODULE_INFO(srcversion, "93F6268BE44CC1A37258E98");
