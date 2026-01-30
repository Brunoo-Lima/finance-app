import s from './_form.module.scss';
import { IGoal } from '@/@types/IGoal';
import { Modal } from '@/components/ui/modal';
import { ModalBackground } from '@/components/ui/modal-background';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  goalFormSchema,
  IGoalFormSchema,
} from '@/validations/goal-form-schema';
import { toast } from 'sonner';
import { Dropdown } from '@/components/ui/dropdown/dropdown';
import { InputDate } from '@/components/ui/input/input-date/input-date';
import { InputValue } from '@/components/ui/input/input-value/input-value';
interface IFormUpsertGoalProps {
  selected: IGoal | null;
  mode?: 'create' | 'update';
  onClose: () => void;
  onSave: () => void;
}

export const FormUpsertGoal = ({
  mode,
  selected,
  onClose,
  onSave,
}: IFormUpsertGoalProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IGoalFormSchema>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: selected?.title ?? '',
      amountTarget: selected?.amountTarget ?? 0,
      amountSaved: selected?.amountSaved ?? undefined,
      termDate: selected?.termDate ?? '',
      category: selected ? String(selected.category) : 'OTHER',
      contributionMonthly: selected?.contributionMonthly ?? undefined,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IGoalFormSchema> = async (data) => {
    try {
      console.log(data);

      onSave();
    } catch (error) {
      toast.error('Erro ao criar meta.');
    }
  };

  return (
    <ModalBackground>
      <Modal.Root onClose={onClose} className={s.modal__root}>
        <Modal.Header
          title={`${mode === 'create' ? 'Criar ' : 'Editar '}
           meta financeira`}
          onClose={onClose}
        />

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className={s.modal__content}>
            <Input
              label="Nome da meta"
              placeholder="Digite o nome da meta"
              {...register('title')}
              error={errors?.title}
            />

            <Controller
              control={control}
              name="amountTarget"
              render={({ field }) => (
                <InputValue
                  {...field}
                  label="Valor alvo"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.amountTarget}
                />
              )}
            />

            <Controller
              control={control}
              name="amountSaved"
              render={({ field }) => (
                <InputValue
                  {...field}
                  label="Valor já economizado"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.amountSaved}
                />
              )}
            />

            <Controller
              control={control}
              name="contributionMonthly"
              render={({ field }) => (
                <InputValue
                  {...field}
                  label="Contribuição mensal"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.contributionMonthly}
                />
              )}
            />

            <Controller
              control={control}
              name="termDate"
              render={({ field }) => (
                <InputDate
                  {...field}
                  label="Data"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors?.termDate}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Dropdown
                  label="Categoria"
                  {...field}
                  options={[
                    {
                      label: 'Transporte',
                      value: 'TRANSPORTATION',
                    },
                    {
                      label: 'Entretenimento',
                      value: 'ENTERTAINMENT',
                    },
                    {
                      label: 'Educação',
                      value: 'EDUCATION',
                    },
                    {
                      label: 'Moradia',
                      value: 'HOUSING',
                    },
                    {
                      label: 'Utilidades',
                      value: 'UTILITY',
                    },
                    {
                      label: 'Saúde',
                      value: 'HEALTH',
                    },
                    {
                      label: 'Alimentação',
                      value: 'FOOD',
                    },
                    {
                      label: 'Salário',
                      value: 'SALARY',
                    },
                    {
                      label: 'Carro',
                      value: 'CAR',
                    },
                    {
                      label: 'Trabalho',
                      value: 'WORK',
                    },
                    {
                      label: 'Outro',
                      value: 'OTHER',
                    },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Selecione"
                />
              )}
            />
          </Modal.Content>
          <Modal.Footer className={s.modal__footer}>
            <Button variant="cancel" type="button" onClick={onClose}>
              Cancelar
            </Button>

            <Button variant="default" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Root>
    </ModalBackground>
  );
};
