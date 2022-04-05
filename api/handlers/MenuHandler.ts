import { Handler } from './Handler';
import { Request } from '$types/server';
import { MenuLinkModel } from '$models/MenuLinkModel';

export class MenuHandler extends Handler {
    async create(req: Request) {
        return this.success(await new MenuLinkModel().createMenuLink(req.body), 201);
    }
    async update(req: Request) {
        return this.success(
            await new MenuLinkModel().updateMenuLink(parseInt(req.params.id), req.body),
            204
        );
    }

    async delete(req: Request) {
        return this.success(await new MenuLinkModel().deleteMenULink(parseInt(req.params.id)), 204);
    }

    async select() {
        return this.success(await new MenuLinkModel().selectMenuLinks());
    }
}
