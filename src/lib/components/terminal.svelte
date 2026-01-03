<script lang="ts">
	import { onMount } from 'svelte';

	type TerminalLine = { type: 'command' | 'output'; content: string };
	type TerminalState = 'typing-whoami' | 'typing-role' | 'typing-skills' | 'typing-clear';

	interface TerminalConfig {
		whoami: string;
		role: string;
		skills: string[];
		typingSpeed?: number;
		outputDelay?: number;
		cursorDelay?: number;
		clearDelay?: number;
		commandGap?: number;
	}

	let { config }: { config: TerminalConfig } = $props();

	const whoami = $derived(config.whoami);
	const role = $derived(config.role);
	const skills = $derived(config.skills);
	const typingSpeed = $derived(config.typingSpeed ?? 120);
	const outputDelay = $derived(config.outputDelay ?? 500);
	const cursorDelay = $derived(config.cursorDelay ?? 800);
	const clearDelay = $derived(config.clearDelay ?? 1500);
	const commandGap = $derived(config.commandGap ?? 100);

	let terminalState = $state<TerminalState>('typing-whoami');
	let terminalCommand = $state('');
	let terminalLines = $state<TerminalLine[]>([]);
	let terminalCommandIndex = $state(0);
	let showCursor = $state(false);

	let terminalInterval: ReturnType<typeof setInterval> | null = null;
	let terminalTimeout: ReturnType<typeof setTimeout> | null = null;

	function clearTimers() {
		if (terminalInterval) {
			clearInterval(terminalInterval);
			terminalInterval = null;
		}
		if (terminalTimeout) {
			clearTimeout(terminalTimeout);
			terminalTimeout = null;
		}
	}

	function addCommand(command: string) {
		terminalLines = [...terminalLines, { type: 'command', content: command }];
		terminalCommand = '';
		terminalCommandIndex = 0;
	}

	function addOutput(content: string | string[]) {
		const outputs = Array.isArray(content) ? content : [content];
		outputs.forEach((output) => {
			terminalLines = [...terminalLines, { type: 'output', content: output }];
		});
	}

	function transitionToNextState(nextState: TerminalState, callback?: () => void) {
		showCursor = false;
		terminalState = nextState;
		terminalCommandIndex = 0;
		if (callback) callback();
	}

	function animateTerminal() {
		clearTimers();

		const animate = () => {
			switch (terminalState) {
				case 'typing-whoami': {
					const command = 'whoami';
					if (terminalCommandIndex < command.length) {
						terminalCommand = command.slice(0, terminalCommandIndex + 1);
						terminalCommandIndex++;
					} else {
						clearInterval(terminalInterval!);
						terminalInterval = null;
						addCommand(command);
						terminalTimeout = setTimeout(() => {
							addOutput(whoami);
							terminalTimeout = setTimeout(() => {
								transitionToNextState('typing-role', animateTerminal);
							}, commandGap);
						}, outputDelay);
						return;
					}
					break;
				}

				case 'typing-role': {
					const command = 'cat roles.txt';
					if (terminalCommandIndex < command.length) {
						terminalCommand = command.slice(0, terminalCommandIndex + 1);
						terminalCommandIndex++;
					} else {
						clearInterval(terminalInterval!);
						terminalInterval = null;
						addCommand(command);
						terminalTimeout = setTimeout(() => {
							addOutput(role);
							terminalTimeout = setTimeout(() => {
								transitionToNextState('typing-skills', animateTerminal);
							}, commandGap);
						}, outputDelay);
						return;
					}
					break;
				}

				case 'typing-skills': {
					const command = 'cat skills.txt';
					if (terminalCommandIndex < command.length) {
						terminalCommand = command.slice(0, terminalCommandIndex + 1);
						terminalCommandIndex++;
					} else {
						clearInterval(terminalInterval!);
						terminalInterval = null;
						addCommand(command);
						terminalTimeout = setTimeout(() => {
							addOutput(skills);
							terminalTimeout = setTimeout(() => {
								transitionToNextState('typing-clear', animateTerminal);
							}, clearDelay);
						}, outputDelay);
						return;
					}
					break;
				}

				case 'typing-clear': {
					const command = 'clear';
					if (terminalCommandIndex < command.length) {
						terminalCommand = command.slice(0, terminalCommandIndex + 1);
						terminalCommandIndex++;
					} else {
						clearInterval(terminalInterval!);
						terminalInterval = null;
						addCommand(command);
						terminalTimeout = setTimeout(() => {
							terminalLines = [];
							terminalCommand = '';
							terminalCommandIndex = 0;
							terminalTimeout = setTimeout(() => {
								transitionToNextState('typing-whoami', animateTerminal);
							}, 300);
						}, outputDelay);
						return;
					}
					break;
				}
			}
		};

		terminalInterval = setInterval(animate, typingSpeed);
	}

	onMount(() => {
		animateTerminal();
		return clearTimers;
	});
</script>

<div class="relative w-full max-w-md">
	<div
		class="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 rounded-full blur-3xl opacity-50"
	></div>

	<div class="relative bg-card border border-border rounded-lg p-8 shadow-lg font-mono text-sm">
		<div class="flex items-center gap-2 mb-4 pb-4 border-b border-border">
			<div class="flex gap-1.5">
				<div class="w-3 h-3 rounded-full bg-red-500/50"></div>
				<div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
				<div class="w-3 h-3 rounded-full bg-green-500/50"></div>
			</div>
			<span class="text-xs text-muted-foreground ml-2">terminal</span>
		</div>

		<div class="space-y-2 min-h-[280px]">
			{#each terminalLines as line}
				{#if line.type === 'command'}
					<div class="flex items-center gap-2">
						<span class="text-muted-foreground">$</span>
						<span class="text-foreground">{line.content}</span>
					</div>
				{:else}
					<div class="pl-4 text-foreground">{line.content}</div>
				{/if}
			{/each}

			{#if terminalCommand}
				<div class="flex items-center gap-2">
					<span class="text-muted-foreground">$</span>
					<span class="text-foreground">{terminalCommand}</span>
					<span class="inline-block w-0.5 h-4 bg-foreground ml-1 animate-pulse"></span>
				</div>
			{/if}

			{#if showCursor && !terminalCommand}
				<div class="flex items-center gap-2">
					<span class="text-muted-foreground">$</span>
					<span class="text-foreground animate-pulse">_</span>
				</div>
			{/if}
		</div>
	</div>
</div>
