// ============================================================
// CUSTOM ROLES & MODERATOR OVERRIDE
// File này được load sau app.js trong index.html
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initCustomRoleModal();
    renderCustomRolesList();
});

// --- QUẢN LÝ CUSTOM ROLE FORM ---
function initCustomRoleModal() {
    const btnOpen = document.getElementById('btn-open-custom-role-form');
    const colorInput = document.getElementById('custom-role-color');
    const colorPreview = document.getElementById('custom-role-color-preview');
    const teamSelect = document.getElementById('custom-role-team');
    const radioNight = document.getElementById('action-type-night');
    const radioPassive = document.getElementById('action-type-passive');
    const btnSave = document.getElementById('btn-save-custom-role');
    const modal = document.getElementById('custom-role-modal');

    if (!btnOpen) return;

    btnOpen.addEventListener('click', () => openCustomRoleModal(null));

    ['btn-close-custom-role-modal', 'btn-cancel-custom-role'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', closeCustomRoleModal);
    });

    if (modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeCustomRoleModal(); });
    }

    if (colorInput) {
        colorInput.addEventListener('input', () => {
            if (colorPreview) colorPreview.textContent = colorInput.value;
        });
    }

    function updateActionTypeUI() {
        const isNight = document.querySelector('input[name="custom-role-action-type"]:checked')?.value === 'night';
        const ns = document.getElementById('custom-role-night-settings');
        if (ns) ns.style.display = isNight ? 'block' : 'none';
    }

    if (radioNight) radioNight.addEventListener('change', updateActionTypeUI);
    if (radioPassive) radioPassive.addEventListener('change', updateActionTypeUI);

    if (teamSelect) {
        teamSelect.addEventListener('change', () => {
            const wc = document.getElementById('custom-role-win-cond-section');
            if (wc) wc.style.display = teamSelect.value === 'third' ? 'block' : 'none';
        });
    }

    if (btnSave) btnSave.addEventListener('click', saveCustomRole);
}

function openCustomRoleModal(customRoleId) {
    const modal = document.getElementById('custom-role-modal');
    if (!modal) return;
    const f = (id) => document.getElementById(id);

    if (customRoleId) {
        const r = gameState.customRoles.find(x => x.id === customRoleId);
        if (!r) return;
        f('custom-role-modal-title').textContent = 'Chỉnh Sửa Chức Năng';
        f('custom-role-edit-id').value = r.id;
        f('custom-role-name').value = r.name;
        f('custom-role-team').value = r.team;
        f('custom-role-color').value = r.color;
        f('custom-role-color-preview').textContent = r.color;
        f('custom-role-count').value = r.count;
        f('custom-role-desc').value = r.desc || '';
        f('custom-role-night-position').value = r.nightPosition || 'after_wolf';
        f('custom-role-night-script').value = r.nightScript || '';
        f('custom-role-can-target').checked = r.canTarget !== false;
        f('custom-role-can-reveal').checked = r.canReveal === true;
        f('custom-role-self-effect').value = r.selfEffect || r.deathEffect || '';
        f('custom-role-target-effect').value = r.targetEffect || '';
        f('custom-role-win-condition').value = r.winCondition || '';
        
        const isNight = r.actionType !== 'passive';
        f('action-type-night').checked = isNight;
        f('action-type-passive').checked = !isNight;
        f('custom-role-night-settings').style.display = isNight ? 'block' : 'none';
        f('custom-role-win-cond-section').style.display = r.team === 'third' ? 'block' : 'none';
    } else {
        f('custom-role-modal-title').textContent = 'Thêm Chức Năng Tùy Chỉnh';
        f('custom-role-edit-id').value = '';
        f('custom-role-name').value = '';
        f('custom-role-team').value = 'villager';
        f('custom-role-color').value = '#a78bfa';
        f('custom-role-color-preview').textContent = '#a78bfa';
        f('custom-role-count').value = 1;
        f('custom-role-desc').value = '';
        f('action-type-night').checked = true;
        f('action-type-passive').checked = false;
        f('custom-role-night-settings').style.display = 'block';
        const passiveSettings = f('custom-role-passive-settings');
        if (passiveSettings) passiveSettings.style.display = 'none';
        f('custom-role-night-position').value = 'after_wolf';
        f('custom-role-night-script').value = '';
        f('custom-role-can-target').checked = true;
        f('custom-role-can-reveal').checked = false;
        f('custom-role-self-effect').value = '';
        f('custom-role-target-effect').value = '';
        f('custom-role-win-condition').value = '';
        f('custom-role-win-cond-section').style.display = 'none';
    }
    modal.classList.add('active');
}

function closeCustomRoleModal() {
    const modal = document.getElementById('custom-role-modal');
    if (modal) modal.classList.remove('active');
}

function saveCustomRole() {
    // Đảm bảo không bị crash nếu localStorage phiên bản cũ chưa có mảng này
    if (!gameState.customRoles) gameState.customRoles = [];
    if (!gameState.selectedCustomRoles) gameState.selectedCustomRoles = {};

    const f = (id) => document.getElementById(id);
    const editId = f('custom-role-edit-id').value;
    const name = f('custom-role-name').value.trim();
    const team = f('custom-role-team').value;
    const color = f('custom-role-color').value;
    const count = parseInt(f('custom-role-count').value) || 1;
    const desc = f('custom-role-desc').value.trim();
    const actionType = document.querySelector('input[name="custom-role-action-type"]:checked')?.value || 'night';
    const nightPosition = f('custom-role-night-position').value;
    const nightScript = f('custom-role-night-script').value.trim();
    const canTarget = f('custom-role-can-target').checked;
    const canReveal = f('custom-role-can-reveal').checked;
    const selfEffect = f('custom-role-self-effect').value.trim();
    const targetEffect = f('custom-role-target-effect').value.trim();
    const winCondition = f('custom-role-win-condition').value.trim();

    if (!name) { alert('Vui lòng nhập tên chức năng!'); return; }

    if (editId) {
        const existing = gameState.customRoles.find(r => r.id === editId);
        if (existing) {
            Object.assign(existing, { name, team, color, count, desc, actionType, nightPosition, nightScript, canTarget, canReveal, selfEffect, targetEffect, winCondition });
            gameState.selectedCustomRoles[editId] = count;
        }
        addLog('Đã cập nhật chức năng tùy chỉnh: ' + name, 'info');
    } else {
        const newId = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        gameState.customRoles.push({ id: newId, name, team, color, count, desc, actionType, nightPosition, nightScript, canTarget, canReveal, selfEffect, targetEffect, winCondition, icon: 'star' });
        gameState.selectedCustomRoles[newId] = count;
        addLog('Đã tạo chức năng tùy chỉnh: ' + name, 'info');
    }

    persistCurrentState();
    closeCustomRoleModal();
    renderCustomRolesList();
}

function renderCustomRolesList() {
    const container = document.getElementById('custom-roles-list');
    const emptyMsg = document.getElementById('custom-roles-empty');
    if (!container) return;

    Array.from(container.children).forEach(child => {
        if (child.id !== 'custom-roles-empty') child.remove();
    });

    if (!gameState.customRoles || gameState.customRoles.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }
    if (emptyMsg) emptyMsg.style.display = 'none';

    const teamLabels = { villager: 'Dân', wolf: 'Sói', third: 'Phe 3' };
    const actionLabels = { night: '🌙 Ban Đêm', passive: '⚡ Thụ Động' };

    gameState.customRoles.forEach(role => {
        const card = document.createElement('div');
        card.className = 'custom-role-card';
        card.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:rgba(0,0,0,0.2);border-left:3px solid ' + role.color + ';margin-bottom:8px;';
        card.innerHTML = `
            <div style="width:32px;height:32px;border-radius:50%;background:rgba(${hexToRgb(role.color)},0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i data-lucide="star" style="width:16px;height:16px;color:${role.color};"></i>
            </div>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:0.9rem;color:${role.color};">${role.name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);">${teamLabels[role.team] || 'Dân'} · ${actionLabels[role.actionType] || ''} · SL: <strong>${role.count}</strong></div>
            </div>
            <div style="display:flex;gap:6px;flex-shrink:0;">
                <button class="btn btn-secondary btn-sm" onclick="openCustomRoleModal('${role.id}')" style="padding:4px 8px;font-size:0.75rem;">Sửa</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomRole('${role.id}')" style="padding:4px 8px;font-size:0.75rem;">Xóa</button>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

window.deleteCustomRole = function(id) {
    if (!confirm('Bạn chắc chắn muốn xóa chức năng này?')) return;
    gameState.customRoles = gameState.customRoles.filter(r => r.id !== id);
    delete gameState.selectedCustomRoles[id];
    gameState.players.forEach(p => { if (p.role === id) p.role = 'unassigned'; });
    persistCurrentState();
    renderCustomRolesList();
    addLog('Đã xóa chức năng tùy chỉnh.', 'warning');
};

// ---- Override getNightOrder để chèn custom night roles ----
(function() {
    const _orig = getNightOrder;
    getNightOrder = function() {
        const base = _orig();
        if (!gameState.customRoles || gameState.customRoles.length === 0) return base;

        const nightCustom = gameState.customRoles.filter(r => r.actionType === 'night');
        if (nightCustom.length === 0) return base;

        const result = [...base];
        const anchorMap = {
            before_wolf: { before: 'wolf' },
            after_wolf:  { before: 'witch' },
            after_seer:  { before: 'fox' },
            end:         { before: null }
        };

        const groups = {};
        nightCustom.forEach(r => {
            const pos = r.nightPosition || 'after_wolf';
            if (!groups[pos]) groups[pos] = [];
            groups[pos].push(r.id);
        });

        ['before_wolf', 'after_wolf', 'after_seer', 'end'].forEach(pos => {
            if (!groups[pos]) return;
            const anchor = anchorMap[pos];
            let idx = anchor.before ? result.indexOf(anchor.before) : result.length;
            if (idx < 0) idx = result.length;
            groups[pos].forEach(roleId => {
                if (!result.includes(roleId)) { result.splice(idx, 0, roleId); idx++; }
            });
        });

        return result;
    };
})();

// ---- Render workspace cho custom role ban đêm ----
function renderCustomRoleWorkspace(roleKey) {
    const cr = gameState.customRoles.find(r => r.id === roleKey);
    if (!cr) return;
    const container = document.getElementById('night-action-inputs');
    if (!container) return;

    let targetHtml = '';
    if (cr.canTarget) {
        const opts = gameState.players.filter(p => p.isAlive).map(p =>
            `<div class="action-option-item" onclick="selectCustomTarget('${roleKey}','${p.id}',this)">${p.name}</div>`
        ).join('');
        targetHtml = `
            <div class="glass-panel-nested p-2 mb-3">
                <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:6px;">Chọn mục tiêu:</p>
                <div class="action-options-grid" id="cr-target-grid-${roleKey}">${opts}</div>
                <p id="cr-target-label-${roleKey}" style="font-size:0.85rem;color:var(--color-accent);margin-top:8px;min-height:20px;"></p>
            </div>`;
    }

    let revealHtml = '';
    if (cr.canReveal) {
        revealHtml = `<div id="cr-reveal-${roleKey}" style="display:none;margin-top:8px;padding:10px 14px;border-radius:8px;text-align:center;border:2px solid var(--color-accent);">
            <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px;">Phe của mục tiêu:</p>
            <p id="cr-reveal-result-${roleKey}" style="font-size:1.3rem;font-weight:800;"></p>
        </div>`;
    }

    container.innerHTML = targetHtml + revealHtml + `
        <button class="btn btn-success w-100 mt-2" onclick="confirmCustomRoleAction('${roleKey}')">
            <i data-lucide="check-circle"></i> Xác nhận & Tiếp tục
        </button>`;
    lucide.createIcons();
}

window.selectCustomTarget = function(roleKey, playerId, el) {
    const grid = document.getElementById('cr-target-grid-' + roleKey);
    if (grid) grid.querySelectorAll('.action-option-item').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');

    if (!gameState.nightActions.customTargets) gameState.nightActions.customTargets = {};
    gameState.nightActions.customTargets[roleKey] = playerId;

    const player = gameState.players.find(p => p.id === playerId);
    const label = document.getElementById('cr-target-label-' + roleKey);
    if (label && player) label.textContent = 'Đã chọn: ' + player.name;

    // Reveal phe nếu canReveal
    const cr = gameState.customRoles.find(r => r.id === roleKey);
    if (cr && cr.canReveal && player) {
        let roleDef = ROLES_DEFINITION[player.role];
        if (!roleDef) {
            const tCr = gameState.customRoles.find(r => r.id === player.role);
            if (tCr) roleDef = { team: tCr.team };
        }
        const teamMap = {
            wolf:     { label: '🐺 MA SÓI',      color: '#ef4444' },
            villager: { label: '🏡 DÂN LÀNG',     color: '#10b981' },
            third:    { label: '⚡ PHE THỨ BA',   color: '#f59e0b' },
            ambiguous:{ label: '❓ KHÔNG RÕ',     color: '#6b7280' }
        };
        const ti = teamMap[roleDef?.team] || teamMap.ambiguous;
        const rs = document.getElementById('cr-reveal-' + roleKey);
        const rr = document.getElementById('cr-reveal-result-' + roleKey);
        if (rs && rr) {
            rr.textContent = ti.label;
            rr.style.color = ti.color;
            rs.style.display = 'block';
            rs.style.borderColor = ti.color;
        }
    }
};

window.confirmCustomRoleAction = function(roleKey) {
    const cr = gameState.customRoles.find(r => r.id === roleKey);
    if (!cr) { confirmGenericAction(roleKey); return; }

    const targetId = gameState.nightActions.customTargets?.[roleKey];
    if (cr.canTarget && targetId) {
        const p = gameState.players.find(x => x.id === targetId);
        if (p) addLog('[' + cr.name + '] đã chọn mục tiêu: ' + p.name, 'info');
    } else {
        addLog('[' + cr.name + '] đã hành động.', 'info');
    }
    markStepCompleted(roleKey);
    goToNextActiveStep(roleKey);
};

// ---- Cảnh báo điều kiện thắng Phe Thứ Ba ----
function checkCustomRoleThirdPartyWinConditions() {
    if (!gameState.customRoles) return;
    gameState.customRoles.filter(r => r.team === 'third' && r.winCondition).forEach(role => {
        const living = gameState.players.filter(p => p.role === role.id && p.isAlive);
        if (living.length > 0) {
            const names = living.map(p => p.name).join(', ');
            const alertDiv = document.createElement('div');
            alertDiv.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(245,158,11,0.95);color:#1a1a2e;padding:12px 20px;border-radius:10px;z-index:9999;max-width:90vw;text-align:center;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,0.4);';
            alertDiv.innerHTML = '<strong>' + role.name + '</strong> (' + names + ') còn sống!<br><span style="font-size:0.85rem;font-weight:400;">ĐK thắng: ' + role.winCondition + '</span><br><button onclick="this.parentElement.remove()" style="margin-top:8px;background:rgba(0,0,0,0.2);border:none;padding:4px 14px;border-radius:6px;cursor:pointer;font-weight:700;">Đã biết</button>';
            document.body.appendChild(alertDiv);
            setTimeout(() => { if (alertDiv.parentElement) alertDiv.remove(); }, 12000);
        }
    });
}

// ---- Cảnh báo Death Effect khi Bản thân chết / Mục tiêu bị chết ----
function triggerCustomRoleDeathEffects(deadPlayerIds) {
    if (!gameState.customRoles || !deadPlayerIds || deadPlayerIds.length === 0) return;
    
    const createToast = (cr, title, message, effectText) => {
        let container = document.getElementById('cr-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'cr-toast-container';
            container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
            document.body.appendChild(container);
        }

        const alertDiv = document.createElement('div');
        alertDiv.className = 'cr-alert';
        alertDiv.style.cssText = 'background:rgba(30,20,50,0.95);color:var(--text-primary);padding:16px 20px;border-radius:8px;width:320px;max-width:90vw;border-left:4px solid ' + cr.color + ';box-shadow:0 8px 30px rgba(0,0,0,0.5);transition:all 0.3s ease;pointer-events:auto;';
        alertDiv.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <div style="font-size:0.95rem;font-weight:800;color:${cr.color};">⚠️ ${title}</div>
                <button onclick="this.closest('.cr-alert').remove()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:0;"><i data-lucide="x" style="width:16px;height:16px"></i></button>
            </div>
            <p style="margin-bottom:6px;font-size:0.85rem;">${message}</p>
            <div style="background:rgba(255,255,255,0.05);padding:8px;border-radius:4px;font-size:0.8rem;margin-bottom:8px;color:var(--text-muted);">
                ${effectText}
            </div>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:0;font-style:italic;">Dùng nút ⚙️ ở danh sách để thao tác thêm.</p>
        `;
        container.appendChild(alertDiv);
        lucide.createIcons();
    };

    // 1. Kiểm tra Bản thân chết
    deadPlayerIds.forEach(id => {
        const player = gameState.players.find(p => p.id === id);
        if (!player) return;
        const cr = gameState.customRoles.find(r => r.id === player.role && (r.selfEffect || r.deathEffect));
        if (!cr) return;
        
        createToast(cr, 'Hiệu ứng: ' + cr.name, `<strong>${player.name}</strong> (${cr.name}) vừa chết!`, cr.selfEffect || cr.deathEffect);
    });

    // 2. Kiểm tra Mục tiêu chết
    if (gameState.nightActions && gameState.nightActions.customTargets) {
        gameState.customRoles.forEach(cr => {
            if (!cr.targetEffect) return;
            const targetId = gameState.nightActions.customTargets[cr.id];
            if (!targetId || !deadPlayerIds.includes(targetId)) return;
            
            // Tìm xem có người chơi nào mang vai trò này còn sống không
            const alivePlayers = gameState.players.filter(p => p.role === cr.id && p.isAlive);
            if (alivePlayers.length === 0) return;
            
            const targetPlayer = gameState.players.find(p => p.id === targetId);
            const targetName = targetPlayer ? targetPlayer.name : 'Mục tiêu';

            createToast(cr, 'Mục tiêu chết: ' + cr.name, `Mục tiêu <strong>${targetName}</strong> của [${cr.name}] vừa chết!`, cr.targetEffect);
        });
    }
}

// ============================================================
// MODERATOR OVERRIDE (QUYỀN NĂNG QUẢN TRÒ)
// ============================================================

window.openOverrideModal = function(playerId) {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    const modal = document.getElementById('override-modal');
    if (!modal) return;

    document.getElementById('override-player-id').value = playerId;
    document.getElementById('override-player-name').innerText = player.name;
    document.getElementById('override-player-status').value = player.isAlive ? 'alive' : 'dead';

    // Sinh options cho override-player-role
    const roleSelect = document.getElementById('override-player-role');
    let roleOptionsHtml = '';
    
    // Core Roles
    Object.keys(ROLES_DEFINITION).forEach(rk => {
        const def = ROLES_DEFINITION[rk];
        roleOptionsHtml += `<option value="${rk}">${def.name}</option>`;
    });

    // Custom Roles
    if (gameState.customRoles && gameState.customRoles.length > 0) {
        roleOptionsHtml += `<optgroup label="--- Chức Năng Tùy Chỉnh ---">`;
        gameState.customRoles.forEach(cr => {
            roleOptionsHtml += `<option value="${cr.id}">✦ ${cr.name}</option>`;
        });
        roleOptionsHtml += `</optgroup>`;
    }

    roleSelect.innerHTML = roleOptionsHtml;
    roleSelect.value = player.role || 'villager';

    modal.classList.add('active');
};

window.closeOverrideModal = function() {
    const modal = document.getElementById('override-modal');
    if (modal) modal.classList.remove('active');
};

window.saveOverrideModal = function() {
    const playerId = document.getElementById('override-player-id').value;
    const status = document.getElementById('override-player-status').value;
    const newRole = document.getElementById('override-player-role').value;

    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;

    let changes = [];
    const isNowAlive = (status === 'alive');
    
    if (player.isAlive !== isNowAlive) {
        player.isAlive = isNowAlive;
        changes.push(`trạng thái thành ${isNowAlive ? 'Sống' : 'Chết'}`);
    }

    if (player.role !== newRole) {
        player.role = newRole;
        // Lookup role name
        let roleName = ROLES_DEFINITION[newRole]?.name;
        if (!roleName && gameState.customRoles) {
            roleName = gameState.customRoles.find(r => r.id === newRole)?.name;
        }
        changes.push(`chức năng thành ${roleName || newRole}`);
    }

    if (changes.length > 0) {
        addLog(`⚡ QUẢN TRÒ TUỲ CHỈNH: [${player.name}] đã bị đổi ${changes.join(' và ')}.`, 'warning');
        
        // Cập nhật giao diện lập tức
        renderPlayerSidebarList();
        if (typeof renderAssignTable === 'function' && document.getElementById('assign-table-body')) {
            renderAssignTable();
        }
        if (typeof renderHangedSelector === 'function' && document.getElementById('select-hanged-player')) {
            renderHangedSelector();
        }
        persistCurrentState();
    }

    closeOverrideModal();
};
